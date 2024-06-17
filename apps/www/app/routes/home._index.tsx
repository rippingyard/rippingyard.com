import { json } from '@vercel/remix';

import { MenuItem, QuickMenu } from '~/components/QuickMenu';

const links: MenuItem[] = [
  { to: '/', label: 'Top', caption: 'トップ' },
  { to: '/post/create', label: 'Create A Post', caption: '新規投稿' },
  { to: '/home/lab', label: 'A Lab', caption: 'ラボ' },
];

export const loader = async () => {
  return json({});
};

export default function Index() {
  return (
    <>
      <QuickMenu links={links} prefix="homemenu" />
      <button onClick={() => alert('')}>スナックバー</button>
    </>
  );
}
