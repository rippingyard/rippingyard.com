import { Await, useLoaderData } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@vercel/remix';
import { Timestamp } from 'firebase-admin/firestore';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button } from '~/components/Button';
import { Loading } from '~/features/loading';
import { PostTable } from '~/features/postTable';
import { QueryParams } from '~/hooks/condition/usePostConditions';
import { useInifiniteItems } from '~/hooks/fetch/useInfiniteItems';
import { usePosts } from '~/hooks/fetch/usePosts.server';
import { TimestampType } from '~/hooks/normalize/useDate';
import { getMe } from '~/middlewares/session.server';
import { Post } from '~/schemas/post';
import { toMicroseconds } from '~/utils/date';
import { sortPosts } from '~/utils/post';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { uid } = await getMe(request);

  const args: Omit<QueryParams<Post>, 'collection'> = {
    limit: 12,
    myId: uid || undefined,
    removeWhereKeys: ['status', 'isPublic'],
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
  const { items: initialItems } = useLoaderData<typeof loader>();
  const [canAutoload] = useState(true);

  const { ref, inView } = useInView();

  const {
    items: posts,
    state,
    loadMore,
    isCompleted,
  } = useInifiniteItems<Post>({
    initialItems: initialItems as Post[],
  });

  const sortedPosts = useMemo(() => sortPosts(posts), [posts]);

  const isLoading = useMemo(() => state === 'loading', [state]);

  const query = useMemo(() => {
    const lastPublishedAt = sortedPosts[sortedPosts.length - 1]?.publishedAt;
    if (!lastPublishedAt) return;
    return `?index&after=${toMicroseconds(lastPublishedAt as unknown as TimestampType)}`;
  }, [sortedPosts]);

  useEffect(() => {
    if (!canAutoload || !inView || state !== 'idle' || !query) return;
    loadMore(query);
  }, [canAutoload, inView, loadMore, query, state]);

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={posts}>
        <PostTable posts={sortedPosts} />
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
  );
}
