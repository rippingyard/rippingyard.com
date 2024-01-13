import { css } from '@emotion/react';
import { defer } from '@vercel/remix';
import type { LoaderFunction } from '@vercel/remix';

import { Loading } from '~/features/loading';
import { PostList } from '~/features/postList';
import { usePosts } from '~/hooks/fetch/usePosts';

import {
  Await,
  useLoaderData,
} from '.pnpm/@remix-run+react@2.5.0_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist';
import { Suspense } from '.pnpm/@types+react@18.2.47/node_modules/@types/react';

export const loader: LoaderFunction = async () => {
  const posts = await usePosts();
  return defer({
    posts: posts.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1)),
  });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main css={containerStyle}>
      <h2>Posts</h2>
      <Suspense fallback={<Loading />}>
        <Await resolve={posts}>
          <PostList posts={posts} />
        </Await>
      </Suspense>
    </main>
  );
}

const containerStyle = css({
  maxWidth: 780,
  margin: 'auto',
  padding: 24,
});
