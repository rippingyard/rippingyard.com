import { QueryParams, useCachedDoc } from '../firestore/useCachedDoc';
import { OriginalPost } from '~/schemas/post';

export type PostQueryParams = Omit<QueryParams, 'collection' | 'id'>;

export const usePost = (id: string, args?: PostQueryParams) => {

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