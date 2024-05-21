import { Outlet } from '@remix-run/react';
import { json, redirect, type LoaderFunctionArgs } from '@vercel/remix';

import { Heading } from '~/components/Heading';
import { getMe } from '~/middlewares/session.server';
import { containerStyle } from '~/styles/container.css';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { uid } = await getMe(request);
  if (!uid) return redirect('/');
  return json({});
};

export default function Index() {
  return (
    <>
      <Heading>Home</Heading>
      <main className={containerStyle}>
        <Outlet />
      </main>
    </>
  );
}
