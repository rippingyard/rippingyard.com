﻿﻿import OpenAI from 'openai';
import { redirect } from 'react-router';

import { commitSession, getMe, getSession } from '~/middlewares/session.server';

import type { Route } from './+types/entitiesFromText';

export const config = {
  maxDuration: 60,
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { uid } = await getMe(request);
  if (!uid) {
    const session = await getSession(request.headers.get('Cookie'));
    session.flash('alertMessage', '利用権限がありません。ログインしてください');
    return redirect('/login', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }
  return {
    content:
      '少し酒を飲んでから帰宅。少しだけ眠って、下北沢K2で『NN4444』。俺の後ろで満席になって焦った。人が入りすぎてる。気鋭の日本人映像作家によるホラー短編4本のオムニバス。全作品良かった（みんな編集が凄すぎる）のだが、その中でも最後の『Void』の出来が良すぎて吹っ飛んだ。昨日観た黒沢清の短編を思い出してしまうような不条理さで、一見何を描いているのかよくわからない。が、そこには何かがある。おそらく、何の脈絡もなく挿入される池田良さんが喫茶店で話しているシーンがキーになっていて、「負の空気」をやり過ごすためには「虚無」になるしかない、という諦念。友人の死に接しても「すっごい、遊ぶね」と、死を軽んじているように見える友人たちの態度に違和感を覚えていた主人公が、「だょね」と遂に飛び込んでしまうと、その瞬間、幾多の身体が横たわって見える。特に主演の野内まるさんの演技が素晴らしかった。',
  };
};

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData();
    const content = formData.get('content') as string;

    const openai = new OpenAI({
      apiKey: process.env.VITE_OPENAI_APIKEY,
      organization: process.env.VITE_OPENAI_ORGANIZATION_ID,
      project: process.env.VITE_OPENAI_PROJECT_ID,
    });

    // スレッドとメッセージの作成
    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content,
    });

    // ストリーミング用のTransformStream
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    // 空のデータで初期化
    const initialData = {
      content,
      result: {
        categories: [],
        entities: [],
      },
    };

    writer.write(encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`));

    // 非同期でRunを作成して処理
    (async () => {
      try {
        // Runの作成
        const run = await openai.beta.threads.runs.create(thread.id, {
          assistant_id: process.env.VITE_OPENAI_ENTITY_ASSISTANT as string,
        });

        // ステータスをポーリングして進捗を送信
        let status = await openai.beta.threads.runs.retrieve(thread.id, run.id);

        while (
          status.status !== 'completed' &&
          status.status !== 'failed' &&
          status.status !== 'cancelled'
        ) {
          // 定期的にステータスを更新
          await new Promise((resolve) => setTimeout(resolve, 1000));
          status = await openai.beta.threads.runs.retrieve(thread.id, run.id);

          // 処理中のステータスを送信
          const progressData = {
            content,
            status: status.status,
            progress: true,
          };
          writer.write(
            encoder.encode(`data: ${JSON.stringify(progressData)}\n\n`)
          );
        }

        if (status.status === 'completed') {
          const messages = await openai.beta.threads.messages.list(
            run.thread_id
          );

          let result = {};
          for (const message of messages.data.reverse()) {
            if (message.role !== 'assistant') continue;
            if (message.content[0].type !== 'text') continue;
            result = JSON.parse(message.content[0].text.value);
            console.log('result', result);
            break;
          }

          // 最終結果を送信
          const finalData = {
            content,
            result,
            completed: true,
          };
          writer.write(
            encoder.encode(`data: ${JSON.stringify(finalData)}\n\n`)
          );
        } else {
          // エラー状態を送信
          const errorData = {
            content,
            error: `処理が完了しませんでした: ${status.status}`,
            completed: true,
          };
          writer.write(
            encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`)
          );
        }
      } catch (error: unknown) {
        console.error('Stream processing error:', error);
        // エラー状態を送信
        const errorData = {
          content,
          error: `処理中にエラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`,
          completed: true,
        };
        writer.write(encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`));
      } finally {
        writer.close();
      }
    })();

    // ストリームレスポンスを返す
    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (e: unknown) {
    console.error(e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
