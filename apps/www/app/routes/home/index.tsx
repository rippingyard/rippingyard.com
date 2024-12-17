import { useCallback } from 'react';
import { useSubmit } from 'react-router';

import { MenuItem, QuickMenu } from '~/components/QuickMenu';
import { clearCachedItems } from '~/hooks/cache/useCache';

const links: MenuItem[] = [
  { to: '/', label: 'Top', caption: 'トップ' },
  { to: '/post/create', label: 'Create A Post', caption: '新規投稿' },
  {
    to: '/home/profile',
    label: 'Edit My Profile',
    caption: 'プロフィール編集',
  },
  { to: '/home/lab', label: 'A Lab', caption: 'ラボ' },
];

export const loader = async () => {
  return {};
};

export default function Index() {
  const submit = useSubmit();

  const onLogout = useCallback(async () => {
    await submit(
      {},
      {
        method: 'POST',
        action: '/logout',
        navigate: false,
      }
    );
    clearCachedItems();
  }, [submit]);

  return (
    <>
      <QuickMenu links={links} prefix="homemenu" />
      <span onClick={onLogout}>ログアウト</span>
    </>
  );
}
