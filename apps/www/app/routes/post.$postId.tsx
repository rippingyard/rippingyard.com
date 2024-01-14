import { css } from '@emotion/react';
import { defer } from '@vercel/remix';
import type {
  LoaderFunction,
  MetaFunction,
  LoaderFunctionArgs,
} from '@vercel/remix';

import { Article } from '~/components/article';
import { usePost } from '~/hooks/fetch/usePost';
import { useDate } from '~/hooks/normalize/useDate';
import { getSummary, getTitle } from '~/utils/typography';

import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';

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
  console.log('post.content', post.content);
  const title = getTitle(post.content, {
    alt: useDate(post.publishedAt, 'YYYY年MM月DD日の記録'),
  });
  console.log('title', title);
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
      <main css={mainStyle}>
        <h2>Post</h2>
        <Suspense fallback={<div>Loading</div>}>
          <Await resolve={post}>
            <Article text={post.content} />
          </Await>
        </Suspense>
      </main>
    </div>
  );
}

const mainStyle = css({
  maxWidth: 780,
  margin: 'auto',
  padding: 24,
});
