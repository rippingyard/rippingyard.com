import { QueryParams, useCachedDoc } from '../firestore/useCachedDoc';
import { OriginalPost } from '~/schemas/post';

export const useUser = (id: string, args?: Omit<QueryParams, 'collection' | 'id'>) => {

  return useCachedDoc<OriginalPost>({
    ...args,
    collection: 'users',
    id,
  });

};