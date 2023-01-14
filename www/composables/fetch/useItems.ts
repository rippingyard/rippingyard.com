import { QueryParams, useCachedDocs } from '../firestore/useCachedDocs';
import { OriginalItem } from '~/schemas/item';

export const useItems = (args: Omit<QueryParams, 'collection'> = {}) => {

  const { where = [] } = args;

  return useCachedDocs<OriginalItem>({
    ...args,
    collection: 'items',
    where: [
      { key: 'isDeleted', val: false },
      // { key: 'isPublic', val: true },
      { key: 'status', val: 'published' },
      ...where,
    ],
  });

};