import { Post } from '~/schemas/post';

import { QueryParams, useQuery } from '../firestore/useQuery';

const buildConditions = (args: Omit<QueryParams<Post>, 'collection'> = {}) => {
  const { where = [] } = args;

  const whereKeys = Object.keys(where);

  if (!whereKeys.includes('isDeleted'))
    where.push({ key: 'isDeleted', val: false });
  if (!whereKeys.includes('isPublic'))
    where.push({ key: 'isPublic', val: true });
  if (!whereKeys.includes('status'))
    where.push({ key: 'status', val: 'published' });

  if (!args.orderBy) {
    args.orderBy = {
      key: 'publishedAt',
      order: 'desc',
    };
  }

  return { args, where };
};

export const usePosts = async (
  payload: Omit<QueryParams<Post>, 'collection'> = {}
) => {
  const args = buildConditions(payload);
  const { data } = await useQuery<Post>({
    collection: 'posts',
    ...args,
  });
  return data;
};

// export const useInfinitePosts = (payload: Omit<QueryParams, 'collection'> = {}) => {

//   const { args, where } = buildConditions(payload);

//   console.log('payload', payload);

//   return useCachedInfiniteDocs<Post>({
//     ...args,
//     collection: 'posts',
//     where,
//   });

// };
