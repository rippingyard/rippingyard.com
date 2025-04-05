import OpenAI from 'openai';
import { redirect } from 'react-router';

import { commitSession, getMe, getSession } from '~/middlewares/session.server';

export const config = {
  maxDuration: 60,
};

export const loader = async ({ request }: { request: Request }) => {
  // 認証チェック
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

  // POSTリクエストからのリダイレクトではない場合
  return new Response(
    JSON.stringify({
      error: 'このエンドポイントはPOSTリクエストでのみ使用できます',
    }),
    {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const action = async ({ request }: { request: Request }) => {
  // 認証チェック
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

  // FormDataからcontent取得
  const formData = await request.formData();
  const content = formData.get('content') as string;

  if (!content) {
    return new Response(JSON.stringify({ error: 'Content is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // ストリーミング用のTransformStream
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  // 空のデータで初期化
  const initialData = {
    content: content.substring(0, 100) + '...', // 長いcontentのログを防ぐために省略
    result: {
      categories: [],
      entities: [],
    },
  };

  writer.write(encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`));

  // 非同期でOpenAI処理を開始
  (async () => {
    try {
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
          content: content.substring(0, 100) + '...', // ログ用に省略
          status: status.status,
          progress: true,
        };
        writer.write(
          encoder.encode(`data: ${JSON.stringify(progressData)}\n\n`)
        );
      }

      if (status.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(run.thread_id);

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
          content: content.substring(0, 100) + '...', // ログ用に省略
          result,
          completed: true,
        };
        writer.write(encoder.encode(`data: ${JSON.stringify(finalData)}\n\n`));
      } else {
        // エラー状態を送信
        const errorData = {
          content: content.substring(0, 100) + '...', // ログ用に省略
          error: `処理が完了しませんでした: ${status.status}`,
          completed: true,
        };
        writer.write(encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`));
      }
    } catch (error: unknown) {
      console.error('Stream processing error:', error);
      // エラー状態を送信
      const errorData = {
        content: content.substring(0, 100) + '...', // ログ用に省略
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
};
