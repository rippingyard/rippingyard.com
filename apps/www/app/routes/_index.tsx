import { Await, useFetcher, useLoaderData } from '@remix-run/react';
import { defer } from '@vercel/remix';
import type { LoaderFunction } from '@vercel/remix';
import { Timestamp } from 'firebase/firestore';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button } from '~/components/button';
import { Heading } from '~/components/heading';
import { Loading } from '~/features/loading';
import { PostList } from '~/features/postList';
import { usePosts } from '~/hooks/fetch/usePosts';
import { QueryParams } from '~/hooks/firestore/useQuery';
import { Post } from '~/schemas/post';
import { containerStyle } from '~/styles/container.css';
import { toMicroseconds } from '~/utils/date';

const args: Omit<QueryParams<Post>, 'collection'> = {
  limit: 1,
  orderBy: {
    key: 'publishedAt',
    order: 'desc',
  },
};

export const loader: LoaderFunction = async (remixContext) => {
  const url = new URL(remixContext.request.url);
  const after = url.searchParams.get('after');
  const startAfter = after ? Timestamp.fromMillis(parseInt(after)) : undefined;

  if (startAfter) {
    args.startAfter = startAfter;
  }

  const { data: posts } = await usePosts(args);

  return defer({
    posts: posts.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1)),
  });
};

export default function Index() {
  const { posts: initialPosts } = useLoaderData<{ posts: Post[] }>();

  const [posts, setPosts] = useState(initialPosts);
  const lastPublishedAt = useMemo(
    () => posts[posts.length - 1]?.publishedAt || undefined,
    [posts]
  );

  const { ref, inView } = useInView({ threshold: 0 });

  const fetcher = useFetcher<{ posts: Post[] }>();

  const loadMore = useCallback(() => {
    const after = toMicroseconds(lastPublishedAt);
    const query = `?index&after=${after}`;
    fetcher.load(query);
  }, [fetcher, lastPublishedAt]);

  useEffect(() => {
    if (!fetcher.data || fetcher.state === 'loading') return;
    const newPosts = fetcher.data.posts;
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  }, [fetcher.data, fetcher.state]);

  // useEffect(() => {
  //   console.log('inView', inView);
  //   if (!inView) return;
  //   onLoadMore();
  // }, [inView, onLoadMore]);

  return (
    <main className={containerStyle}>
      <Heading>Posts</Heading>
      <Suspense fallback={<Loading />}>
        <Await resolve={posts}>
          <PostList posts={posts} />
          <Button ref={ref} onClick={loadMore}>
            Load More...{inView ? 'IN' : 'OUT'}
          </Button>
        </Await>
      </Suspense>
    </main>
  );
}
