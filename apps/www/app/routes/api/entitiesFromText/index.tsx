import OpenAI from 'openai';
import { redirect } from 'react-router';

import { commitSession, getMe, getSession } from '~/middlewares/session.server';

export const config = {
  maxDuration: 60,
};

export const loader = async ({ request }: { request: Request }) => {
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
    content: '記事内容サンプル',
  };
};

export const action = async ({ request }: { request: Request }) => {
  try {
    // 認証チェック
    const { uid } = await getMe(request);
    if (!uid) {
      const session = await getSession(request.headers.get('Cookie'));
      session.flash(
        'alertMessage',
        '利用権限がありません。ログインしてください'
      );
      return redirect('/login', {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    }

    // 同期処理のエンドポイント

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

    // OpenAIを使用してエンティティを取得（同期処理）
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

    // Runの作成と完了を待機
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: process.env.VITE_OPENAI_ENTITY_ASSISTANT as string,
    });

    if (run.status !== 'completed') {
      throw new Error(`Run failed with status: ${run.status}`);
    }

    // 結果を取得
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    let result = {};
    for (const message of messages.data.reverse()) {
      if (message.role !== 'assistant') continue;
      if (message.content[0].type !== 'text') continue;
      result = JSON.parse(message.content[0].text.value);
      break;
    }

    // 結果を返す
    return Response.json({
      content: content.substring(0, 100) + '...', // ログ用に省略
      result,
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
