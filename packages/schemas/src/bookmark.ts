import { z } from 'zod';

import { SuggestedTagSchema } from './tag';
import { TimestampSchema } from './timestamp';
import { DocumentReferenceSchema } from './utils';

export const BookmarkSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string().optional(),
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema,
  expiredAt: TimestampSchema.optional(),
  contents: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      sitename: z.string().optional(),
      image: z
        .object({
          url: z.string(),
          type: z.string().optional(),
          width: z.number().optional(),
          height: z.number().optional(),
          alt: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  isPublic: z.boolean(),
  isDeleted: z.boolean(),
  count: z
    .object({
      favorite: z.number(),
      bookmark: z.number(),
      pageview: z.number(),
    })
    .optional(),
  tags: z.string().array(),
  suggestedTags: SuggestedTagSchema.array(),
  posts: z.any().refine(DocumentReferenceSchema).array().optional(),
  vector: z.any().optional(),
});

export type Bookmark = z.infer<typeof BookmarkSchema>;

export type BookmarkAsSearchResult = Pick<
  Bookmark,
  'isDeleted' | 'isPublic' | 'title' | 'tags'
> & {
  url: string;
  title: string;
  createdAt: number;
  publishedAt: number;
  updatedAt: number;
  objectID: string;
};
