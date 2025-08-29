import { z } from 'zod';

import { TimestampSchema } from './timestamp';
import { DocumentReferenceSchema } from './utils';

export const categoryIds = [
  'film',
  'music',
  'book',
  'art',
  'game',
  'politic',
  'food',
  'technology',
] as const;
export type CategoryId = (typeof categoryIds)[number];

export type Category = {
  id: CategoryId;
  label: {
    ja: string;
  };
  isSelected?: boolean;
};

const EntityStatusSchema = z.enum(['published', 'drafted']);
const EntityTypeSchema = z.enum(['genre', 'bookmark', 'tag']);

export const EntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: EntityTypeSchema,
  description: z.string(),
  thumbnailImage: z.string(),
  images: z.string().array(),
  entities: z.any().refine(DocumentReferenceSchema).array(),
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema,
  isDeleted: z.boolean(),
  status: EntityStatusSchema,
});

export type Entity = z.infer<typeof EntitySchema>;
