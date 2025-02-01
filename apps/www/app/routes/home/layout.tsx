import { Outlet } from '@remix-run/react';
import { redirect, type LoaderFunctionArgs } from '@vercel/remix';

import { Heading } from '~/components/Heading';
import { commitSession, getMe, getSession } from '~/middlewares/session.server';
import { wideContainerStyle } from '~/styles/container.css';

export const loader = async ({ request }: LoaderFunctionArgs) => {
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
  return {};
};

export default function Index() {
  return (
    <>
      <Heading>Home</Heading>
      <main className={wideContainerStyle}>
        <Outlet />
      </main>
    </>
  );
}
