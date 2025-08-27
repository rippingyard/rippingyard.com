import { z } from 'zod';

import { DocumentReferenceSchema } from './utils';
import { TimestampSchema } from './timestamp';

export const CacheSchema = z.object({
  id: z.string(),
  body: z.any().optional(),
  target: z.any().refine(DocumentReferenceSchema).optional(),
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema,
  expiredAt: TimestampSchema,
});

export type Cache = z.infer<typeof CacheSchema>;