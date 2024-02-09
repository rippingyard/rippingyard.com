import { Seed } from '~/schemas/seed';

import { useSeeds } from './useSeeds';

export const useSeed = async (slug: string): Promise<Seed> => {
  const seeds = await useSeeds();
  const seed = seeds.find((seed) => seed.slug === slug);
  if (!seed) throw new Error('seed not found');
  return seed;
};
