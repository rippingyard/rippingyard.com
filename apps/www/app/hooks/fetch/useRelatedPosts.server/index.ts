import dayjs from 'dayjs';
import { Timestamp } from 'firebase-admin/firestore';

import { useSaveCache } from '~/hooks/save/useSaveCache.server';

import type { Post } from '@rippingyard/schemas';

import { useCache } from '../useCache.server';
import { Payload, useNearestPosts } from '../useNearestPosts.server';

export const useRelatedPosts = async (
  post: Post,
  payload: Payload = {}
): Promise<Post[]> => {
  if (!post) return [];

  const cacheKey = `related-posts-${post.id}`;
  const cache = await useCache<Post[]>(cacheKey);
  const { saveCache } = useSaveCache();

  let posts: Post[] = [];
  if (cache) {
    console.log('hit cache!', cacheKey);
    posts = cache;
  } else {
    const { data: nearestPosts } = await useNearestPosts(
      post.content || '',
      payload
    );
    posts = [...nearestPosts];

    const expiredAt = Timestamp.fromDate(dayjs().add(1, 'day').toDate());

    if (posts.length > 0) {
      await saveCache({
        id: cacheKey,
        body: posts,
        expiredAt,
      });
    }
  }

  return posts.filter((p) => p.id !== post.id);
};
