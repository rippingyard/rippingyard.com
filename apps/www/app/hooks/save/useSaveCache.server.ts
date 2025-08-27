import { Timestamp } from 'firebase-admin/firestore';
import { ZodError } from 'zod';

import { type Cache, CacheSchema } from '@rippingyard/schemas';

import { useFirestore } from '../firestore/useFirestore.server';

type CachePayload = Pick<Cache, 'id' | 'body' | 'expiredAt'>;

const saveCache = async (payload: Partial<CachePayload>) => {
  try {
    const db = useFirestore();

    const { id, body = '', expiredAt } = payload;

    const cacheCollection = db.collection('caches');

    const cacheDoc = id ? cacheCollection.doc(id) : cacheCollection.doc();

    const oldCache = (await cacheDoc.get()).data() as Partial<Cache>;

    const cache: Partial<Cache> = {
      body,
      createdAt: Timestamp.now(),
      ...oldCache,
      id: cacheDoc.id,
      updatedAt: Timestamp.now(),
    };

    if (expiredAt !== undefined) cache.expiredAt = expiredAt;

    console.log('newCache', cache);

    // Validation
    CacheSchema.parse(cache);

    await cacheDoc.set(cache);

    return { cache };
  } catch (e) {
    if (e instanceof ZodError) {
      const flattened = e.flatten();
      console.log('flattened', flattened);
      throw flattened;
    }

    console.error(e);
    throw e;
  }
};

const deleteCache = async (id: string) => {
  const db = useFirestore();
  const cacheDoc = db.collection('caches').doc(id);
  await cacheDoc.delete();
};

export const useSaveCache = () => {
  return { saveCache, deleteCache };
};
