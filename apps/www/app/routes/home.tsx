import { Outlet } from '@remix-run/react';
import { json, redirect, type LoaderFunctionArgs } from '@vercel/remix';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase-admin/firestore';

import { Heading } from '~/components/Heading';
import { QueryParams } from '~/hooks/condition/usePostConditions';
import { useCache } from '~/hooks/fetch/useCache.server';
import { usePosts } from '~/hooks/fetch/usePosts.server';
import { useDocReference } from '~/hooks/firestore/useDocReference.server';
import { useSaveCache } from '~/hooks/save/useSaveCache.server';
import { commitSession, getMe, getSession } from '~/middlewares/session.server';
import { Post } from '~/schemas/post';
import { wideContainerStyle } from '~/styles/container.css';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { uid } = await getMe(request);
  if (!uid) {
    const session = await getSession(request.headers.get('Cookie'));
    session.flash('alertMessage', '利用権限がありません。ログインしてください');
    return redirect('/login', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  const cacheKey = `my-tags-${uid}`;
  const cache = await useCache<string[]>(cacheKey);
  const saveCache = useSaveCache();

  // TODO: この辺の処理は、フック化できるはず
  let myTags: string[] = [];
  if (cache) {
    console.log('cached!', cacheKey);
    myTags = cache;
  } else {
    const args: Omit<QueryParams<Post>, 'collection'> = {
      limit: 100,
      myId: uid,
      removeWhereKeys: ['isPublic'],
      where: [
        {
          key: 'owner',
          val: useDocReference(uid, 'users'),
        },
      ],
      orderBy: {
        key: 'publishedAt',
        order: 'desc',
      },
    };
    const { data: items } = await usePosts(args);

    for (const item of items) {
      if (!item?.tags) continue;
      const tags = item.tags.filter((tag) => tag && !myTags.includes(tag));
      myTags.push(...tags);
    }

    const expiredAt = Timestamp.fromDate(dayjs().add(1, 'day').toDate());

    if (myTags.length > 0)
      await saveCache({
        id: cacheKey,
        body: myTags,
        expiredAt,
      });
  }
  return json({ myTags });
};

export default function Index() {
  return (
    <>
      <Heading>Home</Heading>
      <main className={wideContainerStyle}>
        <Outlet />
      </main>
    </>
  );
}
