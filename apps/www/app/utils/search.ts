// import dayjs from 'dayjs';
// import { Timestamp } from 'firebase-admin/firestore';

import { SerializedPost, PostAsSearchResult } from '~/schemas/post';

import { msToSerializedTimestamp } from './date';

export const hitToPost = (item: PostAsSearchResult): SerializedPost => {
  return {
    id: item.objectID,
    slug: item.objectID,
    content: item.content,
    // createdAt: Timestamp.fromDate(dayjs(item.createdAt * 1000).toDate()),
    // publishedAt: Timestamp.fromDate(dayjs(item.publishedAt * 1000).toDate()),
    // updatedAt: Timestamp.fromDate(dayjs(item.updatedAt * 1000).toDate()),
    createdAt: msToSerializedTimestamp(item.createdAt * 1000),
    updatedAt: msToSerializedTimestamp(item.updatedAt * 1000),
    publishedAt: msToSerializedTimestamp(item.publishedAt * 1000),
    status: item.status,
    type: item.type,
    isPublic: item.isPublic,
    isDeleted: item.isDeleted,
    // entities: [],
    items: [],
    tags: [],
    suggestedTags: [],
  };
};
