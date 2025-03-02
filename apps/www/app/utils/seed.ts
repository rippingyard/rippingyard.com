import dayjs from 'dayjs';
// import { Timestamp } from 'firebase-admin/firestore';

import { SerializedPost } from '~/schemas/post';
import { Seed } from '~/schemas/seed';

import { msToSerializedTimestamp } from './date';

export const seedToPost = (seed: Seed): SerializedPost => {
  return {
    id: seed.id,
    slug: seed.slug,
    content: `<h1>${seed.title}</h1>${seed.body.replace(/<br><\/p>/g, '</p>')}`,
    // createdAt: Timestamp.fromDate(dayjs(seed.created_at).toDate()),
    // publishedAt: Timestamp.fromDate(dayjs(seed.published_at).toDate()),
    // updatedAt: Timestamp.fromDate(dayjs(seed.updated_at).toDate()),
    createdAt: msToSerializedTimestamp(dayjs(seed.created_at).valueOf()),
    updatedAt: msToSerializedTimestamp(dayjs(seed.updated_at).valueOf()),
    publishedAt: msToSerializedTimestamp(dayjs(seed.published_at).valueOf()),
    status: seed.status,
    type: 'article',
    isPublic: true,
    isDeleted: false,
    tags: [],
    suggestedTags: [],
    items: [],
  };
};
