import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { isServer, useQuery } from "@tanstack/vue-query";
import { useCacheKey } from './useCacheKey';
import { useDefaultValue } from './useDefaultValue';
import { useFirebase } from '~/composables/firebase/useFirebase';

type WhereOp = '==' | 'in';
type WhereValue = string | number | boolean | string[];
type OrderType = 'desc' | 'asc';

export type QueryParams = {
  collection: string;
  where?: {
    key: string;
    op?: WhereOp;
    val: WhereValue;
  }[];
  limit?: number;
  orderBy?: {
    key: string;
    order?: OrderType;
  };
};

export const defaultOp = (val: WhereValue): WhereOp => {
  return Array.isArray(val) ? 'in' : '==';
}

export const getCachedDocs = async <T>(args: QueryParams): Promise<T[]> => {
  const { fb } = useFirebase();
  const data: T[] = [];

  const db = getFirestore(fb);

  let q = query(
    collection(db, args.collection)
  );

  if (args?.where) {
    for (const w of args.where) {
      q = query(q, where(w.key, w?.op || defaultOp(w.val), w.val))
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

  if (isServer) return useDefaultValue<T[]>();

  return useQuery({ queryKey: useCacheKey<QueryParams>(args), queryFn: () => getCachedDocs<T>(args) });
}
