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

    // FormDataの処理（オプションでできますが、すぐにStreamエンドポイントにリダイレクトするだけです）
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

    // StreamエンドポイントにリダイレクトするURLを作成
    const streamUrl = `/tool/entitiesFromText/stream?content=${encodeURIComponent(content)}`;

    // ストリームを返すエンドポイントへリダイレクト
    return new Response(null, {
      status: 303, // See Other
      headers: {
        Location: streamUrl,
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
