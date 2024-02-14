import { Await, useFetcher, useLoaderData } from '@remix-run/react';
import { defer } from '@vercel/remix';
import type { LoaderFunction } from '@vercel/remix';
import { Timestamp } from 'firebase/firestore';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button } from '~/components/Button_';
import { Heading } from '~/components/Heading_';
import { Loading } from '~/features/loading';
import { PostList } from '~/features/postList';
import { usePosts } from '~/hooks/fetch/usePosts';
import { QueryParams } from '~/hooks/firestore/useQuery';
import { Post } from '~/schemas/post';
import { containerStyle } from '~/styles/container.css';
import { toMicroseconds } from '~/utils/date';

const args: Omit<QueryParams<Post>, 'collection'> = {
  limit: 12,
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
  const [isCompleted, setIsCompleted] = useState(false);
  const [queries, setQueries] = useState<string[]>([]);

  const [posts, setPosts] = useState(initialPosts);
  const lastPublishedAt = useMemo(
    () => posts[posts.length - 1]?.publishedAt || undefined,
    [posts]
  );

  const { ref, inView } = useInView({ threshold: 0 });

  const fetcher = useFetcher<{ posts: Post[] }>();

  const loadMore = useCallback(() => {
    console.log('fetcher', fetcher);
    console.log('queries', queries);
    console.log('lastPublishedAt', lastPublishedAt);
    if (!lastPublishedAt || isCompleted || fetcher.state !== 'idle') return;
    const after = toMicroseconds(lastPublishedAt);
    const query = `?index&after=${after}`;
    if (queries.includes(query)) return;
    setQueries((prev) => [...prev, query]);
    fetcher.load(query);
  }, [fetcher, isCompleted, lastPublishedAt, queries]);

  useEffect(() => {
    if (!fetcher.data || fetcher.state !== 'idle') return;
    const newPosts = fetcher.data.posts;
    if (newPosts.length === 0) return setIsCompleted(true);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  }, [fetcher.data, fetcher.state]);

  useEffect(() => {
    if (!inView || fetcher.state !== 'idle') return;
    loadMore();
  }, [fetcher.state, inView, loadMore]);

  return (
    <main className={containerStyle}>
      <Heading>Posts</Heading>
      <Suspense fallback={<Loading />}>
        <Await resolve={posts}>
          <PostList posts={posts} />
          {!isCompleted && (
            <Button ref={ref} onClick={loadMore}>
              Load More...
            </Button>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
