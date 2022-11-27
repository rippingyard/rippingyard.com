import {
  getFirestore,
  doc,
  // query,
  // where,
  // limit,
  // orderBy,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
import { useQuery } from "@tanstack/vue-query";
import { useFirebase } from '~/composables/firebase/useFirebase';

export type QueryParams = {
  collection: string;
  id: string;
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

  const { collection, id } = args;

  const db = getFirestore(fb);

  const q = doc(db, collection, id);

  // if (args?.where) {
  //   for (const w of args.where) {
  //     q = query(q, where(w.key, w?.op || '==', w.val))
  //   }
  // }

  // if (args?.limit) q = query(q, limit(args.limit));
  // if (args?.orderBy) q = query(q, orderBy(args.orderBy.key, args.orderBy.order || 'desc'));

  const docSnapshot = await getDoc<DocumentData>(q);

  if (docSnapshot.exists()) {
    data = docSnapshot.data();
  }

  return data as T;
}

export const useCachedDoc = <T>(args: QueryParams) => {
  return useQuery({ queryKey: cacheKey(args), queryFn: () => getCachedDoc<T>(args) });
}

const cacheKey = (args: QueryParams): any[] => {
  return [args];
}
