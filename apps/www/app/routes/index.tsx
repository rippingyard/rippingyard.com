import clsx from 'clsx';
import { Timestamp } from 'firebase-admin/firestore';
import { Suspense, useMemo } from 'react';
import { Await, useLoaderData, useNavigate } from 'react-router';

import { Button } from '~/components/Button';
import { DailyPostList } from '~/features/dailyPostList';
import { Loading } from '~/features/loading';
import { TopBillboard } from '~/features/topBillboard';
// import { Button } from '~/components/Button';
// import { Heading } from '~/components/Heading';
// import { DailyPostList } from '~/features/dailyPostList';
// import { Loading } from '~/features/loading';
import { CACHE_KEYS } from '~/hooks/cache/useCache';
import { QueryParams } from '~/hooks/condition/usePostConditions';
import { useInifiniteItems } from '~/hooks/fetch/useInfiniteItems';
import { usePosts } from '~/hooks/fetch/usePosts.server';
import { getMe } from '~/middlewares/session.server';
import { Post } from '~/schemas/post';
import {
  containerStyle,
  edgeStyle,
  wideContainerStyle,
} from '~/styles/container.css';
import { sortPosts } from '~/utils/post';

import type { Route } from './+types/index';

export const loader = async ({ request }: Route.LoaderArgs) => {
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
        val: 'log',
      },
    ],
  });

  return {
    notes,
    articles,
  };
};

export default function Index() {
  const navigate = useNavigate();
  const { notes, articles: initialArticles } = useLoaderData<typeof loader>();

  const { items: articles } = useInifiniteItems<Post>({
    key: CACHE_KEYS.PUBLIC_ARTICLES,
    initialItems: initialArticles as unknown[] as Post[],
  });

  const sortedArticles = useMemo(() => sortPosts(articles), [articles]);

  const { items: posts } = useInifiniteItems<Post>({
    key: CACHE_KEYS.PUBLIC_NOTES,
    initialItems: notes as unknown[] as Post[],
  });

  const sortedPosts = useMemo(() => sortPosts(posts), [posts]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={sortedArticles}>
          <div className={clsx(wideContainerStyle, edgeStyle)}>
            <TopBillboard posts={sortedArticles} />
          </div>
        </Await>
        <main className={containerStyle}>
          <Await resolve={sortedPosts}>
            <DailyPostList posts={sortedPosts} mode="detail" />
            <Button isWide onClick={() => navigate('posts')}>
              もっと読む
            </Button>
          </Await>
        </main>
      </Suspense>
    </>
  );
}
