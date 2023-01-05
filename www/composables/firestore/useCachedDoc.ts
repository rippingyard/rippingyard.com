import {
  getFirestore,
  doc,
  // query,
  // where,
  // limit,
  // orderBy,
  getDoc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import { isServer, useQuery } from '@tanstack/vue-query';
import { useCacheKey } from './useCacheKey';
import { useDefaultValue } from './useDefaultValue';
import { useFirebase } from '~/composables/firebase/useFirebase';

export type QueryParams = {
  collection: string;
  id: string;
  ref: DocumentReference;
  // where?: {
  //   key: string,
  //   op?: '==',
  //   val: string | number | boolean,
  // }[];
  // limit?: number;
  // orderBy?: {
  //   key: string;
  //   order?: 'desc' | 'asc';
  // };
};

export const getCachedDoc = async <T>(args: QueryParams): Promise<T> => {
  const { fb } = useFirebase();
  let data: DocumentData = {};
  let q: DocumentReference<DocumentData>;

  const { collection, id, ref } = args;

  if (ref) {
    q = ref;
  } else {
    const db = getFirestore(fb);
    q = doc(db, collection, id);
  }

  const docSnapshot = await getDoc<DocumentData>(q);

  if (docSnapshot.exists()) {
    data = docSnapshot.data();
  }

  return data as T;
}

export const useCachedDoc = <T>(args: QueryParams) => {

  if (isServer) return useDefaultValue<T>();

  return useQuery({ queryKey: useCacheKey<QueryParams>(args), queryFn: () => getCachedDoc<T>(args) });
}
