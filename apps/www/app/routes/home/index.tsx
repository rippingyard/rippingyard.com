import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubmit } from 'react-router';

import { MenuItem, QuickMenu } from '~/components/QuickMenu';
import { clearCachedItems } from '~/hooks/cache/useCache';

export const loader = async () => {
  return {};
};

export default function Index() {
  const submit = useSubmit();
  const { t } = useTranslation();

  const links: MenuItem[] = [
    { to: '/', label: 'Top', caption: t('quickmenu.top') },
    {
      to: '/post/create',
      label: 'Create An Article',
      caption: t('quickmenu.createPost'),
    },
    {
      to: '/home/profile',
      label: 'Edit My Profile',
      caption: t('quickmenu.editProfile'),
    },
    { to: '/home/lab', label: 'A Lab', caption: t('quickmenu.lab') },
  ];

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
      <span onClick={onLogout}>{t('quickmenu.logout')}</span>
    </>
  );
}
