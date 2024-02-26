// import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

const SeedStatusSchema = z.enum(['published', 'drafted']);
const SeedTypeSchema = z.enum(['archive']);

const SeedSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  leading: z.string().nullable(),
  created_at: z.string(),
  published_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
  body: z.string(),
  image_id: z.string().nullable(),
  parent_id: z.string().nullable(),
  search_body: z.string().optional().nullable(),
  // isPublic: z.boolean(),
  // isDeleted: z.boolean(),
  // owner: z.any().refine(DocumentReferenceSchema),
  type: SeedTypeSchema,
  user_id: z.number(),
  status: SeedStatusSchema,
});

export type Seed = z.infer<typeof SeedSchema>;
