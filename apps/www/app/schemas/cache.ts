import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';

import { DocumentReferenceSchema } from '~/utils/schema';

export const CacheSchema = z.object({
  id: z.string(),
  body: z.any().optional(),
  target: z.any().refine(DocumentReferenceSchema).optional(),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
  expiredAt: z.instanceof(Timestamp),
});

export type Cache = z.infer<typeof CacheSchema>;
