import { json, redirect, type LoaderFunctionArgs } from '@vercel/remix';

import { MenuItem, QuickMenu } from '~/components/QuickMenu';
import { getMe } from '~/middlewares/session.server';

const links: MenuItem[] = [
  { to: '/', label: 'Top', caption: 'トップ' },
  { to: '/post/create', label: 'Create A Post', caption: '新規投稿' },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { uid } = await getMe(request);
  if (!uid) return redirect('/');

  return json({});
};

export default function Index() {
  return (
    <>
      <QuickMenu links={links} prefix="homemenu" />
    </>
  );
}
