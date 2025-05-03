import clsx from 'clsx';
import { FC, useCallback, useMemo } from 'react';
import { useSubmit } from 'react-router';

import { MenuItem, QuickMenu } from '~/components/QuickMenu';
import { clearCachedItems } from '~/hooks/cache/useCache';
import { usePreventScroll } from '~/hooks/ui/usePreventScroll';

import { NavFooter } from './navFooter';
import * as styles from './style.css';

const authedLinks: MenuItem[] = [
  { to: '/', label: 'Top', caption: 'トップ' },
  { to: '/post/create', label: 'Create A Post', caption: '新規投稿' },
  { to: '/home/posts', label: 'My Posts', caption: '自分の記事一覧' },
  {
    to: '/home/profile',
    label: 'Edit My Profile',
    caption: 'プロフィール編集',
  },
  { to: '/home/lab', label: 'A Lab', caption: 'ラボ' },
];

const unauthedLinks: MenuItem[] = [
  { to: '/', label: 'Top', caption: 'トップ' },
  { to: '/login', label: 'Login', caption: 'ログイン' },
];

type Props = {
  isOpened: boolean;
  isAuthenticated: boolean;
};

export const Nav: FC<Props> = ({
  isOpened = false,
  isAuthenticated = false,
}) => {
  usePreventScroll(isOpened);

  const submit = useSubmit();

  const links = useMemo(
    () => (isAuthenticated ? authedLinks : unauthedLinks),
    [isAuthenticated]
  );

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
    <div className={clsx(styles.wrapper, isOpened && styles.open)}>
      <div className={styles.container}>
        <QuickMenu links={links} prefix="nav" />
        <NavFooter isAuthenticated={isAuthenticated} onLogout={onLogout} />
      </div>
    </div>
  );
};
