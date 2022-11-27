import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { useQuery } from "@tanstack/vue-query";
import { useFirebase } from '~/composables/firebase/useFirebase';

export type QueryParams = {
  collection: string;
  where?: {
    key: string,
    op?: '==',
    val: string | number | boolean,
  }[];
  limit?: number;
  orderBy?: {
    key: string;
    order?: 'desc' | 'asc';
  };
};

export const getCachedDocs = async <T>(args: QueryParams): Promise<T[]> => {
  const { fb } = useFirebase();
  const data: T[] = [];

  const db = getFirestore(fb);

  let q = query(
    collection(db, args.collection)
  );

  if (args?.where) {
    for (const w of args.where) {
      q = query(q, where(w.key, w?.op || '==', w.val))
    }
  }

  if (args?.limit) q = query(q, limit(args.limit));
  if (args?.orderBy) q = query(q, orderBy(args.orderBy.key, args.orderBy.order || 'desc'));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    data.push(doc.data() as T);
  });

  return data;
}

export const useCachedDocs = <T>(args: QueryParams) => {
  return useQuery({ queryKey: cacheKey(args), queryFn: () => getCachedDocs<T>(args) });
}

const cacheKey = (args: QueryParams): any[] => {
  return [args];
}
