import dayjs from 'dayjs';
import { Timestamp } from 'firebase-admin/firestore';

import { QueryParams } from '~/hooks/condition/usePostConditions';
import { useDocReference } from '~/hooks/firestore/useDocReference.server';
import { useSaveCache } from '~/hooks/save/useSaveCache.server';
import { Post } from '@rippingyard/schemas';

import { useCache } from '../useCache.server';
import { usePosts } from '../usePosts.server';

export const useMyTags = async ({ uid }: { uid?: string | null }) => {
  const cacheKey = `my-tags-${uid}`;
  const cache = await useCache<string[]>(cacheKey);
  const { saveCache } = useSaveCache();

  if (!uid) return [];

  let myTags: string[] = [];
  if (cache) {
    console.log('cached!', cacheKey);
    myTags = cache;
  } else {
    const args: Omit<QueryParams<Post>, 'collection'> = {
      limit: 250,
      myId: uid,
      removeWhereKeys: ['isPublic'],
      where: [
        {
          key: 'owner',
          val: useDocReference(uid, 'users'),
        },
        {
          key: 'tags',
          op: '!=',
          val: '',
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

    if (myTags.length > 0) {
      await saveCache({
        id: cacheKey,
        body: [...new Set(myTags)],
        expiredAt,
      });
    }
  }

  return myTags;
};
