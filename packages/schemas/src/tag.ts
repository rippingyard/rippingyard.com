import z from 'zod';

export const SuggestedTagSchema = z.object({
  value: z.string(),
  relevance: z.number(),
});

export type SuggestedTag = z.infer<typeof SuggestedTagSchema>;
