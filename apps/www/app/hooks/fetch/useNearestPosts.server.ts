import type { Post } from '@rippingyard/schemas';

import { QueryParams, usePostCondition } from '../condition/usePostConditions';
import { useEmbedding } from '../embedding/useEmbedding.server';
import { useQuery } from '../firestore/useQuery.server';

export const useNearestPosts = async (
  content: string = '',
  payload: Omit<QueryParams<Post>, 'collection'> = {}
) => {
  const { args: orgArgs, where } = usePostCondition(payload);
  const { limit, ...args } = orgArgs;

  const { embedding } = useEmbedding();
  const vector = await embedding(content);

  return await useQuery<Post>({
    collection: 'posts',
    findNearest: {
      vector,
      limit: limit || 5,
    },
    where,
    ...args,
  });
};
