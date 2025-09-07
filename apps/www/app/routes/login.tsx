import dayjs from 'dayjs';
import { redirect, data, useLoaderData } from 'react-router';

import { Heading } from '~/components/Heading';
import { Login } from '~/features/login';
import { useUser } from '~/hooks/fetch/useUser.server';
import { translation } from '~/middlewares/i18n/translation.server';
import {
  commitSession,
  getSession,
  getAuthToken,
  getMe,
} from '~/middlewares/session.server';

import type { Route } from './+types/login';

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const { t } = await translation(request);
    const title = t('login');
    const canonicalUrl = new URL('login', request.url).toString();
    const { uid } = await getMe(request);

    if (uid) return redirect('/');

    return {
      title,
      canonicalUrl,
      meta: [{ tagName: 'link', rel: 'canonical', href: canonicalUrl }],
    };
  } catch (e) {
    console.error(e);
    throw new Response('Not Found', { status: 404 });
  }
};

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData();

    const uid = formData.get('uid') as string;
    const tokenFromForm = formData.get('token') as string;

    if (!tokenFromForm) return {};

    const session = await getSession(request.headers.get('Cookie'));
    const token = await getAuthToken(tokenFromForm);
    const { user } = await useUser(uid);

    session.set('token', token);
    session.set('uid', uid);
    session.set('role', user?.role || 'stranger');
    session.set('authenticatedAt', dayjs().valueOf());

    return data(
      {},
      {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      }
    );
  } catch (e) {
    console.error(e);
    throw new Response('Error', { status: 401 });
  }
};

export const meta = ({ data }: Route.MetaArgs) => {
  const { title, canonicalUrl } = data as any;

  const htmlTitle = `${title} - rippingyard`;
  const image = '/images/ogimage.png';

  return [
    { title: htmlTitle },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    // { name: 'description', content: description },
    // { property: 'og:title', content: htmlTitle },
    // { property: 'og:description', content: summary },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: image },
    // { name: 'twitter:title', content: htmlTitle },
    // { name: 'twitter:description', content: summary },
    { name: 'twitter:image', content: image },
    // { name: 'twitter:card', content: 'summary' },
  ];
};

export default function Main() {
  const { title } = useLoaderData<typeof loader>();
  return (
    <>
      <Heading>{title}</Heading>
      <Login />
    </>
  );
}
