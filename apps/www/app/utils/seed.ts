import { Timestamp } from 'firebase/firestore';

import { Post } from '~/schemas/post';
import { Seed } from '~/schemas/seed';

export const seedToPost = (seed: Seed): Post => {
  return {
    id: seed.id,
    slug: seed.slug,
    content: `<h1>${seed.title}</h1><p>${seed.body}</p>`,
    createdAt: Timestamp.now(), //TODO
    publishedAt: Timestamp.now(), //TODO
    updatedAt: Timestamp.now(), //TODO
    status: 'published', //TODO
    type: 'article',
    isPublic: true,
    isDeleted: false,
    entities: [],
    items: [],
  };
};
