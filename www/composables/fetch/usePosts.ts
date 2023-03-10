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

  return useCachedInfiniteDocs<OriginalPost>({
    ...args,
    collection: 'posts',
    where: [
      { key: 'isDeleted', val: false },
      { key: 'isPublic', val: true },
      { key: 'status', val: 'published' },
      ...where,
    ],
  }, (lastPage, pages) => {
    console.log('lastPage', lastPage, pages);
  });

};