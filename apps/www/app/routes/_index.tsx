import { Await, useLoaderData } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@vercel/remix';
import { Timestamp } from 'firebase/firestore';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { Loading } from '~/features/loading';
import { PostList } from '~/features/postList';
import { useInifiniteItems } from '~/hooks/fetch/useInfiniteItems';
import { usePosts } from '~/hooks/fetch/usePosts';
import { QueryParams } from '~/hooks/firestore/useQuery';
import { Post } from '~/schemas/post';
import { containerStyle } from '~/styles/container.css';
import { toMicroseconds } from '~/utils/date';
import { sortPosts } from '~/utils/post';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const args: Omit<QueryParams<Post>, 'collection'> = {
    limit: 12,
    orderBy: {
      key: 'publishedAt',
      order: 'desc',
    },
  };
  const url = new URL(request.url);
  const after = url.searchParams.get('after');
  const startAfter = after ? Timestamp.fromMillis(parseInt(after)) : undefined;

  if (startAfter) {
    args.startAfter = startAfter;
  }

  const { data: items } = await usePosts(args);

  return json({
    items,
  });
};

export default function Index() {
  const key = 'top';
  const { items: initialItems } = useLoaderData<typeof loader>();
  const [canAutoload] = useState(true);

  const { ref, inView } = useInView();

  const {
    items: posts,
    state,
    loadMore,
    isCompleted,
  } = useInifiniteItems<Post>({
    key,
    initialItems: initialItems as Post[],
  });

  const sortedPosts = useMemo(() => sortPosts(posts), [posts]);

  const isLoading = useMemo(() => state === 'loading', [state]);

  const query = useMemo(() => {
    const lastPublishedAt = sortedPosts[sortedPosts.length - 1]?.publishedAt;
    if (!lastPublishedAt) return;
    return `?index&after=${toMicroseconds(lastPublishedAt)}`;
  }, [sortedPosts]);

  useEffect(() => {
    if (!canAutoload || !inView || state !== 'idle' || !query) return;
    loadMore(query);
  }, [canAutoload, inView, loadMore, query, state]);

  return (
    <>
      <Heading>Posts</Heading>
      <main className={containerStyle}>
        <Suspense fallback={<Loading />}>
          <Await resolve={posts}>
            <PostList posts={sortedPosts} mode="detail" />
            {!isCompleted && query && (
              <Button
                ref={ref}
                isLoading={isLoading}
                onClick={() => loadMore(query)}
              >
                もっと読む
              </Button>
            )}
          </Await>
        </Suspense>
      </main>
    </>
  );
}
