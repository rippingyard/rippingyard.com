import { Await, useLoaderData } from '@remix-run/react';
import { defer } from '@vercel/remix';
import type { LoaderFunction } from '@vercel/remix';
import { Suspense } from 'react';

import { Loading } from '~/features/loading';
import { PostList } from '~/features/postList';
import { usePosts } from '~/hooks/fetch/usePosts';
import { containerStyle } from '~/styles/container.css';

export const loader: LoaderFunction = async () => {
  const posts = await usePosts({
    limit: 25,
  });
  return defer({
    posts: posts.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1)),
  });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main className={containerStyle}>
      <h2>Posts</h2>
      <Suspense fallback={<Loading />}>
        <Await resolve={posts}>
          <PostList posts={posts} />
        </Await>
      </Suspense>
    </main>
  );
}
