import { QueryParams, useCachedDocs, useCachedInfiniteDocs } from '../firestore/useCachedDocs';
import { OriginalPost } from '~/schemas/post';

const buildConditions = (args: Omit<QueryParams, 'collection'> = {}) => {
  const { where = [] } = args;

  const whereKeys = Object.keys(where);

  if (!whereKeys.includes('isDeleted')) where.push({ key: 'isDeleted', val: false });
  if (!whereKeys.includes('isPublic')) where.push({ key: 'isPublic', val: true });
  if (!whereKeys.includes('status')) where.push({ key: 'status', val: 'published' });

  if (!args.orderBy) {
    args.orderBy = {
      key: 'publishedAt',
      order: 'desc',
    }
  }

  return { args, where };
}

export const usePosts = (payload: Omit<QueryParams, 'collection'> = {}) => {

  const { args, where } = buildConditions(payload);

  return useCachedDocs<OriginalPost>({
    ...args,
    collection: 'posts',
    where,
  });

};

export const useInfinitePosts = (payload: Omit<QueryParams, 'collection'> = {}) => {

  const { args, where } = buildConditions(payload);

  console.log('payload', payload);

  return useCachedInfiniteDocs<OriginalPost>({
    ...args,
    collection: 'posts',
    where,
  });

};