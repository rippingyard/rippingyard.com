import {
  getDoc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import { useCacheKey } from './useCacheKey';
import { useDocReference } from './useDocReference';

export type QueryParams = {
  collection?: string;
  id?: string;
  ref?: DocumentReference;
};

export const getCachedDoc = async <T>(args: QueryParams): Promise<T> => {
  try {
    const { collection, id, ref } = args;
    const snapshot = await getDoc<DocumentData>(ref ? useDocReference(ref.id, ref.parent.id || undefined) : useDocReference(id, collection));
    console.log('getCachedDoc snapshot', snapshot);

    if (!snapshot.exists()) return {} as T;

    return snapshot.data() as T;
  } catch (e) {
    console.error('getCachedDoc error', e);
    throw e;
  }
}

export const useCachedDoc = <T>(args: QueryParams) => {
  return useAsyncData<T>(useCacheKey<QueryParams>(args), () => getCachedDoc<T>(args), { server: false, lazy: true });
}
