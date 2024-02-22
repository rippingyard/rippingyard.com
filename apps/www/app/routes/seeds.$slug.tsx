import type { LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { defer } from '@vercel/remix';
import type { LoaderFunction, MetaFunction } from '@vercel/remix';
import { Suspense } from 'react';

import { ADSENSE_IDS, Adsense } from '~/components/Adsense';
import { Article } from '~/components/Article';
import { Heading } from '~/components/Heading';
import { Loading } from '~/features/loading';
import { useSeed } from '~/hooks/fetch/useSeed';
import { useDate } from '~/hooks/normalize/useDate';
import { containerStyle } from '~/styles/container.css';
import { seedToPost } from '~/utils/seed';
import { getSummary, getTitle } from '~/utils/typography';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  try {
    const { slug } = params;
    console.log('slug', slug);

    if (!slug) throw new Error();

    const seed = await useSeed(slug);
    if (!seed) throw new Error();

    const post = seedToPost(seed);

    return defer({ post });
  } catch (e) {
    throw new Response('Not Found', { status: 404 });
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  const { post } = data;

  const title = getTitle(post.content, {
    alt: useDate(post.publishedAt, 'YYYY年MM月DD日の記録'),
  });
  const summary = getSummary(post.content, 340);
  const htmlTitle = `${title} - rippingyard`;
  return [
    { title: htmlTitle },
    { property: 'og:title', content: htmlTitle },
    { name: 'twitter:title', content: htmlTitle },
    { name: 'description', content: summary },
    { property: 'og:description', content: summary },
    { name: 'twitter:description', content: summary },
  ];
};

export default function Main() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <>
      <Heading>Seed</Heading>
      <main className={containerStyle}>
        <Suspense fallback={<Loading />}>
          <Await resolve={post}>
            <Article text={post.content} />
            <Adsense slot={ADSENSE_IDS.POST_BOTTOM} />
          </Await>
        </Suspense>
      </main>
    </>
  );
}
