import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';

import { DocumentReferenceSchema } from '~/utils/schema';

// type EntityBody = {
//   name: string;
// };

const EntityStatusSchema = z.enum(['published', 'drafted']);
const EntityTypeSchema = z.enum(['genre', 'bookmark', 'tag']);
// type EntityType = 'item' | 'place' | 'work' | 'keyword' | 'person' | 'group' | 'event' | 'bookmark' | 'unknown';

export const EntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: EntityTypeSchema,
  description: z.string(),
  thumbnailImage: z.string(),
  images: z.string().array(),
  entities: z.any().refine(DocumentReferenceSchema).array(),
  //   metadata?: { [key: string]: any };
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
  isDeleted: z.boolean(),
  //   translated?: {
  //     [lang: string]: EntityBody;
  //   };
  //   counts: {
  //     favorite: number;
  //     bookmark: number;
  //     pageview: number;
  //   };
  status: EntityStatusSchema,
});

export type Entity = z.infer<typeof EntitySchema>;
