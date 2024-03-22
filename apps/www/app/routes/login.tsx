﻿import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { json } from '@vercel/remix';
import type { LoaderFunction, MetaFunction } from '@vercel/remix';

import { Heading } from '~/components/Heading';
import { Login } from '~/features/login';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  try {
    const title = 'ログイン';
    const canonicalUrl = new URL('login', request.url).toString();

    return json({
      title,
      canonicalUrl,
      meta: [{ tagName: 'link', rel: 'canonical', href: canonicalUrl }],
    });
  } catch (e) {
    throw new Response('Not Found', { status: 404 });
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
