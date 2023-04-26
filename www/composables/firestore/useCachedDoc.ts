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
    console.log('props.post.owner exec', ref, id, collection);
    const snapshot = await getDoc<DocumentData>(useDocReference(ref || id, collection));
    console.log('props.post.owner snapshot', snapshot);

    if (!snapshot.exists()) return {} as T;

    return snapshot.data() as T;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const useCachedDoc = <T>(args: QueryParams) => {

  if (isServer) return useDefaultValue<T>();

  return useQuery({ queryKey: useCacheKey<QueryParams>(args), queryFn: () => getCachedDoc<T>(args) });
}
