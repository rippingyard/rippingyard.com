import dayjs from 'dayjs';
import { Timestamp } from 'firebase-admin/firestore';

import { Post } from '~/schemas/post';
import { Seed } from '~/schemas/seed';

export const seedToPost = (seed: Seed): Post => {
  return {
    id: seed.id,
    slug: seed.slug,
    content: `<h1>${seed.title}</h1>${seed.body.replace(/<br><\/p>/g, '</p>')}`,
    createdAt: Timestamp.fromDate(dayjs(seed.created_at).toDate()),
    publishedAt: Timestamp.fromDate(dayjs(seed.published_at).toDate()),
    updatedAt: Timestamp.fromDate(dayjs(seed.updated_at).toDate()),
    status: seed.status,
    type: 'article',
    isPublic: true,
    isDeleted: false,
    tags: [],
    suggestedTags: [],
    items: [],
  };
};
