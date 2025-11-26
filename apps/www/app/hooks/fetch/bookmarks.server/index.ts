import type { Bookmark } from '@rippingyard/schemas';

import { QueryParams, useBookmarkCondition } from './conditions';
import { useQuery } from '../../firestore/useQuery.server';

export const fetchBookmarks = async (
  payload: Omit<QueryParams<Bookmark>, 'collection'> = {}
) => {
  const { args, where } = useBookmarkCondition(payload);
  return await useQuery<Bookmark>({
    collection: 'bookmarks',
    where,
    ...args,
  });
};
