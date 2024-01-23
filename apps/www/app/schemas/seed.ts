// import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

// import { User } from './user';

// const PostStatusSchema = z.enum(['published', 'drafted']);
// const PostTypeSchema = z.enum(['article', 'note', 'log']);

const SeedSchema = z.object({
  id: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  published_at: z.string(),
  updatedAt: z.string(),
  // content: z.string(),
  // isPublic: z.boolean(),
  // isDeleted: z.boolean(),
  // count: z
  //   .object({
  //     favorite: z.number(),
  //     bookmark: z.number(),
  //     pageview: z.number(),
  //   })
  //   .optional(),
  // owner: z.any().refine(DocumentReferenceSchema),
  // collaborators: z.any().refine(DocumentReferenceSchema),
  // parent: z.any().refine(DocumentReferenceSchema).optional(),
  // entities: z.any().refine(DocumentReferenceSchema).array(),
  // items: z.any().refine(DocumentReferenceSchema).array(),
  // type: PostTypeSchema,
  // status: PostStatusSchema,
  status: z.string(),
});

export type Seed = z.infer<typeof SeedSchema>;
// export type PostType = z.infer<typeof PostTypeSchema>;
// export type PostStatus = z.infer<typeof PostStatusSchema>;
