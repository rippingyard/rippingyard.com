import { Timestamp } from 'firebase-admin/firestore';

import { Cache } from '@rippingyard/schemas';

import { useDoc } from '../firestore/useDoc.server';

export const useCache = async <T>(id: string): Promise<Awaited<T> | null> => {
  const cache = await useDoc<Cache>({
    collection: 'caches',
    id,
  });
  if (!cache) return null;
  if (cache?.expiredAt && cache.expiredAt < Timestamp.now()) return null;

  return cache?.body;
};
