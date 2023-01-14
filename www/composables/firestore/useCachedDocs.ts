import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  orderBy,
  getDocs,
  DocumentReference,
  DocumentData,
  onSnapshot,
} from 'firebase/firestore';
import { isServer, useQuery } from "@tanstack/vue-query";
import { useCacheKey } from './useCacheKey';
import { useDefaultValue } from './useDefaultValue';
import { useFirebase } from '~/composables/firebase/useFirebase';

type WhereOp = '==' | 'in';
type WhereValue = string | number | boolean | string[] | DocumentReference<DocumentData>;
type OrderType = 'desc' | 'asc';

type WhereParam = {
  key: string;
  op?: WhereOp;
  val: WhereValue;
};

export type WhereParams = WhereParam[];

export type QueryParams = {
  collection: string;
  where?: WhereParams;
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
  const ids: string[] = [];

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

  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(change => {
      // console.log('change!', change);
      const { type, doc } = change;
      const index = ids.findIndex(id => id === doc.id);
      switch (type) {
        case 'added':
          // console.log('New article:', doc);
          if (index > -1) break;
          data.push(doc.data() as T);
          ids.push(doc.id);
          break;
        case 'modified':
          // console.log('Modified article:', doc);
          data.splice(index, 1, doc.data() as T);
          break;
        case 'removed':
          // console.log('Removed article:', doc);
          data.splice(index, 1);
          ids.splice(index, 1);
          break;
      }
    });
  });

  // onUnmounted(() => {
  //   console.log('unsubscribe snapshot')
  //   unsubscribe();
  // });

  await getDocs(q);// TODO: これは要らないはず

  return data;
}

export const useCachedDocs = <T>(args: QueryParams) => {

  if (isServer) return useDefaultValue<T[]>();

  const queryKey = useCacheKey<QueryParams>(args);

  return useQuery({ queryKey, queryFn: () => getCachedDocs<T>(args) });
}
