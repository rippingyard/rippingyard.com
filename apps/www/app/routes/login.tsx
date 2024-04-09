import { useLoaderData } from '@remix-run/react';
import { json, redirect } from '@vercel/remix';
import type { LoaderFunctionArgs } from '@vercel/remix';
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@vercel/remix';
import dayjs from 'dayjs';

import { Heading } from '~/components/Heading';
import { Login } from '~/features/login';
import {
  commitSession,
  getSession,
  getAuthToken,
  isAuthenticated,
} from '~/middlewares/session.server';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  try {
    const title = 'ログイン';
    const canonicalUrl = new URL('login', request.url).toString();

    if (await isAuthenticated(request)) return redirect('/');

    return json({
      title,
      canonicalUrl,
      meta: [{ tagName: 'link', rel: 'canonical', href: canonicalUrl }],
    });
  } catch (e) {
    throw new Response('Not Found', { status: 404 });
  }
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();

    const session = await getSession(request.headers.get('Cookie'));
    const token = await getAuthToken(formData.get('token') as string);

    session.set('token', token);
    session.set('uid', formData.get('uid') as string);
    session.set('authenticatedAt', dayjs().valueOf());

    return json(
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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { title, canonicalUrl } = data;

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
