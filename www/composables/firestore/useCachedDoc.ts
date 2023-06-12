import {
  getDoc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import { isServer, useQuery } from '@tanstack/vue-query';
import { useCacheKey } from './useCacheKey';
import { useDefaultValue } from './useDefaultValue';
import { useDocReference } from './useDocReference';

export type QueryParams = {
  collection?: string;
  id?: string;
  ref?: DocumentReference;
};

export const getCachedDoc = async <T>(args: QueryParams): Promise<T> => {
  try {
    const { collection, id, ref } = args;
    // console.log('getCachedDoc exec', ref, id, collection);
    const snapshot = await getDoc<DocumentData>(ref ? useDocReference(ref.id, ref.parent.id) : useDocReference(id, collection));
    console.log('getCachedDoc snapshot', snapshot);

    if (!snapshot.exists()) return {} as T;

    return snapshot.data() as T;
  } catch (e) {
    console.error('getCachedDoc error', e);
    throw e;
  }
}

export const useCachedDoc = <T>(args: QueryParams) => {

  if (isServer) return useDefaultValue<T>();

  return useQuery({ queryKey: useCacheKey<QueryParams>(args), queryFn: () => getCachedDoc<T>(args) });
}
