import { QueryParams, useCachedDoc } from '../firestore/useCachedDoc';
import { OriginalPost } from '~/schemas/post';

export const usePost = (id: string, args?: Omit<QueryParams, 'collection' | 'id'>) => {

  return useCachedDoc<OriginalPost>({
    ...args,
    collection: 'posts',
    id,
    // where: [
    //   { key: 'isDeleted', val: false },
    //   { key: 'isPublic', val: true },
    //   { key: 'status', val: 'published' },
    //   ...where,
    // ],
  });

};