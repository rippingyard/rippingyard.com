import type { LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { defer } from '@vercel/remix';
import type { LoaderFunction, MetaFunction } from '@vercel/remix';
import { Suspense } from 'react';

import { Article } from '~/components/Article';
import { Heading } from '~/components/Heading_';
import { Loading } from '~/features/loading';
import { usePost } from '~/hooks/fetch/usePost';
import { useDate } from '~/hooks/normalize/useDate';
import { containerStyle } from '~/styles/container.css';
import { getSummary, getTitle } from '~/utils/typography';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  try {
    const { postId } = params;

    if (!postId) throw new Error();

    const { post } = await usePost(postId);
    if (!post) throw new Error();

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
    <div>
      <main className={containerStyle}>
        <Heading>Post</Heading>
        <Suspense fallback={<Loading />}>
          <Await resolve={post}>
            <Article text={post.content} />
          </Await>
        </Suspense>
      </main>
    </div>
  );
}
