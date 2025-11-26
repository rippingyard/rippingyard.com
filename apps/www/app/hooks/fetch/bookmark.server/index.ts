import type { Bookmark } from '@rippingyard/schemas';

import { useDoc } from '../../firestore/useDoc.server';

const empty = {
  bookmark: null,
};

export const fetchBookmark = async (id: string) => {
  const bookmark = await useDoc<Bookmark>({
    collection: 'bookmarks',
    id,
  });

  if (!bookmark) return empty;

  if (bookmark.isDeleted) return empty;

  return { bookmark };
};
