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
  OrderByDirection,
  startAfter,
} from 'firebase/firestore';
import { isServer, QueryFunctionContext, useInfiniteQuery, useQuery } from "@tanstack/vue-query";
import { useCacheKey } from './useCacheKey';
import { useDefaultValue } from './useDefaultValue';
import { useFirebase } from '~/composables/firebase/useFirebase';
import { maxBy, minBy } from '~~/utils/array';

type WhereOp = '==' | 'in';
type WhereValue = string | number | boolean | string[] | DocumentReference<DocumentData>;

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
  startAfter?: string | number;
  orderBy?: {
    key: string;
    order?: OrderByDirection;
  };
  removeWhereKeys?: string[];
};

export const defaultOp = (val: WhereValue): WhereOp => {
  return Array.isArray(val) ? 'in' : '==';
}

export const getCachedDocs = async <T>(args: QueryParams, pageParam?: QueryFunctionContext<any[], any>): Promise<T[]> => {
  const { fb } = useFirebase();
  const data: T[] = [];
  const ids: string[] = [];
  const { removeWhereKeys = [] } = args;

  const db = getFirestore(fb);

  let q = query(
    collection(db, args.collection)
  );

  if (args?.where) {
    for (const w of args.where) {
      if (!removeWhereKeys.includes(w.key)) {
        console.log('query key', w.key, w.val);
        q = query(q, where(w.key, w?.op || defaultOp(w.val), w.val));
      }
    }
  }

  if (args?.limit) q = query(q, limit(args.limit));

  if (args?.orderBy) {
    const order = args.orderBy.order || 'desc';
    q = query(q, orderBy(args.orderBy.key, order));
    if (pageParam?.pageParam) {
      q = query(q, startAfter(pageParam.pageParam[args.orderBy.key]));
    }
  }

  console.log('query', q, args?.orderBy);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(change => {
      // console.log('change!', change);
      const { type, doc } = change;
      const index = ids.findIndex(id => id === doc.id);
      switch (type) {
        case 'added':
          // console.log('New article:', doc.data());
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

export const useCachedInfiniteDocs = <T>(
  args: QueryParams
) => {

  const { orderBy } = args;

  if (isServer) return useDefaultValue<T[]>();

  const queryKey = useCacheKey<QueryParams>(args);

  const orderKey = orderBy?.key || 'createdAt';
  const order = orderBy?.order || 'desc';

  return useInfiniteQuery({
    queryKey,
    queryFn: (pageParam) => getCachedDocs<T>(args, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return;
      const lastPost = order === 'desc' ?
        minBy(lastPage as { [key: string]: any }[], orderKey) :
        maxBy(lastPage as { [key: string]: any }[], orderKey);
      return lastPost;
    },
  });
}
