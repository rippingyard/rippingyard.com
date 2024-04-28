import { Link } from '@remix-run/react';
import { json, redirect, type LoaderFunctionArgs } from '@vercel/remix';

import { getMe } from '~/middlewares/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { uid } = await getMe(request);
  if (!uid) return redirect('/');

  return json({});
};

export default function Index() {
  return (
    <>
      <p>
        <Link to="/post/create" prefetch="render">
          新規投稿
        </Link>
      </p>
    </>
  );
}
