import dayjs from 'dayjs';
import { Timestamp } from 'firebase-admin/firestore';

import { Post, PostAsSearchResult } from '@rippingyard/schemas';

export const hitToPost = (item: PostAsSearchResult): Post => {
  return {
    id: item.objectID,
    slug: item.objectID,
    content: item.content,
    createdAt: Timestamp.fromDate(dayjs(item.createdAt * 1000).toDate()),
    publishedAt: Timestamp.fromDate(dayjs(item.publishedAt * 1000).toDate()),
    updatedAt: Timestamp.fromDate(dayjs(item.updatedAt * 1000).toDate()),
    status: item.status,
    type: item.type,
    isPublic: item.isPublic,
    isDeleted: item.isDeleted,
    entities: [],
    items: [],
  };
};
