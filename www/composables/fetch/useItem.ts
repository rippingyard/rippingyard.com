import { QueryParams, useCachedDoc } from '../firestore/useCachedDoc';
import { useDefaultValue } from '../firestore/useDefaultValue';
import { Item } from '~/schemas/item';

export type ItemQueryParams = Omit<QueryParams, 'collection' | 'id'>;

export const useItem = (id: string | ItemQueryParams, args?: ItemQueryParams) => {
  try {
    if (typeof id === 'string') {
      return useCachedDoc<Item>({
        ...args,
        collection: 'items',
        id,
      });
    } else {
      if (!id?.ref) return useDefaultValue<Item>();
      console.log('getCachedDoc id', id.ref);
      return useCachedDoc<Item>(id);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};