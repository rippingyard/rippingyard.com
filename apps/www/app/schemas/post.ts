﻿import { Timestamp } from 'firebase/firestore';
import { Timestamp as ServerTimestamp } from 'firebase-admin/firestore';
import { z } from 'zod';

import { DocumentReferenceSchema } from '~/utils/schema';

// import { User } from './user';

const PostStatusSchema = z.enum(['published', 'drafted']);
const PostTypeSchema = z.enum(['article', 'note', 'log']);

export const PostSchema = z.object({
  id: z.string(),
  slug: z.string().optional(),
  createdAt: z.instanceof(Timestamp).or(z.instanceof(ServerTimestamp)),
  publishedAt: z.instanceof(Timestamp).or(z.instanceof(ServerTimestamp)),
  updatedAt: z.instanceof(Timestamp).or(z.instanceof(ServerTimestamp)),
  content: z.string().min(1),
  isPublic: z.boolean(),
  isDeleted: z.boolean(),
  count: z
    .object({
      favorite: z.number(),
      bookmark: z.number(),
      pageview: z.number(),
    })
    .optional(),
  owner: z.any().refine(DocumentReferenceSchema).optional(),
  collaborators: z.any().refine(DocumentReferenceSchema).optional(),
  parent: z.any().refine(DocumentReferenceSchema).optional(),
  entities: z.any().refine(DocumentReferenceSchema).array(),
  items: z.any().refine(DocumentReferenceSchema).array(),
  type: PostTypeSchema,
  status: PostStatusSchema,
});

export type Post = z.infer<typeof PostSchema>;
export type PostType = z.infer<typeof PostTypeSchema>;
export type PostStatus = z.infer<typeof PostStatusSchema>;
