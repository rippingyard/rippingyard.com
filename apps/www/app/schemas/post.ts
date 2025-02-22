import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';

import { SerializedTimestamp } from '~/utils/date';
import { DocumentReferenceSchema } from '~/utils/schema';

const PostStatusSchema = z.enum(['published', 'drafted']);
const PostTypeSchema = z.enum(['article', 'note', 'log']);
const SuggestedTagSchema = z.object({
  value: z.string(),
  relevance: z.number(),
});

export const PostSchema = z.object({
  id: z.string(),
  slug: z.string().optional(),
  createdAt: z.instanceof(Timestamp),
  publishedAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
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
  tags: z.string().array(),
  items: z.any().refine(DocumentReferenceSchema).array(),
  type: PostTypeSchema,
  status: PostStatusSchema,
  suggestedTags: SuggestedTagSchema.array(),
});

export type Post = z.infer<typeof PostSchema>;
export type PostType = z.infer<typeof PostTypeSchema>;
export type PostStatus = z.infer<typeof PostStatusSchema>;
export type SuggestedTag = z.infer<typeof SuggestedTagSchema>;

export type SerializedPost = Omit<
  Post,
  | 'owner'
  | 'collaborators'
  | 'items'
  | 'parent'
  | 'createdAt'
  | 'updatedAt'
  | 'publishedAt'
> & {
  items?: unknown[];
  collaborators?: unknown[];
  owner: unknown;
  parent?: unknown;
  createdAt: SerializedTimestamp;
  updatedAt: SerializedTimestamp;
  publishedAt: SerializedTimestamp;
};

export type PostAsSearchResult = Pick<
  Post,
  | 'type'
  // | 'createdAt'
  // | 'publishedAt'
  // | 'updatedAt'
  | 'content'
  | 'isDeleted'
  | 'isPublic'
  | 'status'
> & {
  title: string;
  body: string;
  image: string;
  createdAt: number;
  publishedAt: number;
  updatedAt: number;
  objectID: string;
  // _highlightResult: unknown;
};
