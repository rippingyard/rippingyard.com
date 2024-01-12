﻿import { css } from '@emotion/react';
import { Await, useLoaderData } from '@remix-run/react';
import { defer } from '@vercel/remix';
import type { LoaderFunction } from '@vercel/remix';
import { Suspense } from 'react';

import { Loading } from '~/features/loading';
import { PostList } from '~/features/postList';
import { usePosts } from '~/hooks/fetch/usePosts';

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