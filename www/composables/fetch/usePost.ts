import { QueryParams, useCachedDoc } from '../firestore/useCachedDoc';
import { OriginalPost } from '~/schemas/post';
import { useMe } from './useMe';

export type PostQueryParams = Omit<QueryParams, 'collection' | 'id'>;

export const usePost = (id: string, args?: PostQueryParams) => {

  // const { me } = useMe();
  // console.log('me', me);

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