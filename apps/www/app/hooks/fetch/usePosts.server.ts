import { Post } from '~/schemas/post';

import { QueryParams, usePostCondition } from '../condition/usePostConditions';
import { useQuery } from '../firestore/useQuery.server';

export const usePosts = async (
  payload: Omit<QueryParams<Post>, 'collection'> = {}
) => {
  const { args, where } = usePostCondition(payload);
  return await useQuery<Post>({
    collection: 'posts',
    where,
    ...args,
  });
};
