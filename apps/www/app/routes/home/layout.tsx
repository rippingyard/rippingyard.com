import { Outlet } from 'react-router';
import { redirect } from 'react-router';

import { Heading } from '~/components/Heading';
import i18n from '~/middlewares/i18n/i18n.server';
import { commitSession, getMe, getSession } from '~/middlewares/session.server';
import { wideContainerStyle } from '~/styles/container.css';

import type { Route } from './+types/layout';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { uid } = await getMe(request);

  const locale = await i18n.getLocale(request);
  console.log('locale', locale);

  if (!uid) {
    const session = await getSession(request.headers.get('Cookie'));
    session.flash('alertMessage', t('alert.noPermission'));
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
