import type { Post } from '@rippingyard/schemas';

import { QueryParams, usePostCondition } from '../condition/usePostConditions';
import { useEmbedding } from '../embedding/useEmbedding.server';
import { useQuery } from '../firestore/useQuery.server';

export type Payload = Omit<QueryParams<Post>, 'collection'>;

export const useNearestPosts = async (
  content: string = '',
  payload: Payload = {}
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
