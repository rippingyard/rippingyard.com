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
  const { collection, id, ref } = args;
  const snapshot = await getDoc<DocumentData>(useDocReference(ref || id, collection));

  if (!snapshot.exists()) return {} as T;

  return snapshot.data() as T;
}

export const useCachedDoc = <T>(args: QueryParams) => {

  if (isServer) return useDefaultValue<T>();

  return useQuery({ queryKey: useCacheKey<QueryParams>(args), queryFn: () => getCachedDoc<T>(args) });
}
