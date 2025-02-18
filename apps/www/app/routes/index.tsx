import { Await, useLoaderData } from '@remix-run/react';
import { type LoaderFunctionArgs } from '@vercel/remix';
import { Timestamp } from 'firebase-admin/firestore';
import { Suspense, useMemo } from 'react';

import { Loading } from '~/features/loading';
import { PostList } from '~/features/postList';
import { TopBillboard } from '~/features/topBillboard';
import { CACHE_KEYS } from '~/hooks/cache/useCache';
import { QueryParams } from '~/hooks/condition/usePostConditions';
import { useInifiniteItems } from '~/hooks/fetch/useInfiniteItems';
import { usePosts } from '~/hooks/fetch/usePosts.server';
import { getMe } from '~/middlewares/session.server';
import { Post } from '~/schemas/post';
import { containerStyle, wideContainerStyle } from '~/styles/container.css';
import { sortPosts } from '~/utils/post';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { uid } = await getMe(request);
  const args: Omit<QueryParams<Post>, 'collection'> = {
    limit: 12,
    myId: uid || undefined,
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

  const { data: articles } = await usePosts({
    ...args,
    where: [
      {
        key: 'type',
        val: 'article',
      },
    ],
  });
  const { data: notes } = await usePosts({
    ...args,
    where: [
      {
        key: 'type',
        val: 'note',
      },
    ],
  });

  return {
    notes,
    articles,
  };
};

export default function Index() {
  const { notes, articles: initialArticles } = useLoaderData<typeof loader>();

  const { items: articles } = useInifiniteItems<Post>({
    key: CACHE_KEYS.PUBLIC_ARTICLES,
    initialItems: initialArticles as Post[],
  });

  const sortedArticles = useMemo(() => sortPosts(articles), [articles]);

  const { items: posts } = useInifiniteItems<Post>({
    key: CACHE_KEYS.PUBLIC_NOTES,
    initialItems: notes as Post[],
  });

  const sortedPosts = useMemo(() => sortPosts(posts), [posts]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={sortedArticles}>
          <div className={wideContainerStyle}>
            <TopBillboard posts={sortedArticles} />
          </div>
        </Await>
        <main className={containerStyle}>
          <Await resolve={sortedPosts}>
            <PostList posts={sortedPosts} mode="detail" />
          </Await>
        </main>
      </Suspense>
    </>
  );
}
