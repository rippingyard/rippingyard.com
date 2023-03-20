import { QueryParams, useCachedDocs, useCachedInfiniteDocs } from '../firestore/useCachedDocs';
import { OriginalPost } from '~/schemas/post';

export const usePosts = (args: Omit<QueryParams, 'collection'> = {}) => {

  const { where = [] } = args;

  return useCachedDocs<OriginalPost>({
    ...args,
    collection: 'posts',
    where: [
      { key: 'isDeleted', val: false },
      { key: 'isPublic', val: true },
      { key: 'status', val: 'published' },
      ...where,
    ],
  });

};

export const useInfinitePosts = (args: Omit<QueryParams, 'collection'> = {}) => {

  const { where = [] } = args;

  if (!args.orderBy) {
    args.orderBy = {
      key: 'publishedAt',
      order: 'desc',
    }
  }

  return useCachedInfiniteDocs<OriginalPost>({
    ...args,
    collection: 'posts',
    where: [
      { key: 'isDeleted', val: false },
      { key: 'isPublic', val: true },
      { key: 'status', val: 'published' },
      ...where,
    ],
  });

};