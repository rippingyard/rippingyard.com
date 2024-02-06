import {
  DocumentData,
  DocumentReference,
  OrderByDirection,
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

import { useFirestore } from './useFirestore';

// import { useFirebase } from '../firebase/useFirebase';

type WhereOp = '==' | 'in';
type WhereValue =
  | string
  | number
  | boolean
  | string[]
  | DocumentReference<DocumentData>;

type WhereParam = {
  key: string;
  op?: WhereOp;
  val: WhereValue;
};

export type WhereParams = WhereParam[];

type OrderBy = {
  key: string;
  order?: OrderByDirection;
};

export type QueryParams<T> = {
  collection: string;
  where?: WhereParams;
  limit?: number;
  startAfter?: string | number | Timestamp;
  orderBy?: OrderBy;
  lastVisible?: DocumentData;
  removeWhereKeys?: string[];
  initialData?: T[];
};

export const defaultOp = (val: WhereValue): WhereOp =>
  Array.isArray(val) ? 'in' : '==';

export const useQuery = async <T>(
  args: QueryParams<T>
): Promise<{
  data: T[];
  loadMore: () => void;
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
}> => {
  const data: T[] = [];
  const ids: string[] = [];
  const { removeWhereKeys = [] } = args;
  console.log('args', args);

  const { db } = useFirestore();

  let q = query(collection(db, args.collection));

  if (args?.where) {
    const logrows = [];
    for (const w of args.where) {
      if (!removeWhereKeys.includes(w.key)) {
        logrows.push({
          key: w.key,
          val: Array.isArray(w.val) ? w.val.join(', ') : w.val,
        });
        q = query(q, where(w.key, w?.op || defaultOp(w.val), w.val));
      }
    }
    // console.table(logrows);
  }

  if (args?.limit && args?.limit > 0) q = query(q, limit(args.limit));

  if (args?.orderBy) {
    const order = args.orderBy.order || 'desc';
    q = query(q, orderBy(args.orderBy.key, order));
    if (args?.lastVisible) {
      q = query(q, startAfter(args?.lastVisible));
    }
    if (args?.startAfter) {
      q = query(q, startAfter(args?.startAfter));
    }
  }

  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const { type, doc } = change;
      // console.log('change!', type);
      const index = ids.findIndex((id) => id === doc.id);
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

  const docSnapshots = await getDocs(q);
  const lastVisible =
    docSnapshots.docs[docSnapshots.docs.length - 1] || undefined;

  const loadMore = () => {
    console.log('TESTTEST');
  };
  // const loadMore = useCallback(() => {
  //   console.log('lastVisible', lastVisible);
  // }, [lastVisible]);

  return { data, lastVisible, loadMore };
};

// // export const useCachedInfiniteDocs = <T>(args: QueryParams) => {
// //   const data = ref<T[]>();
// //   const lastVisible = ref<T>();

// //   if (!data.value) data.value = [];

// //   return useAsyncData(useCacheKey<QueryParams>(args), async () => {
// //     const newData = await getCachedDocs<T>({
// //       ...args,
// //       lastVisible,
// //     });
// //     data.value = [...(data.value || []), ...newData];

// //     return {
// //       data,
// //       lastVisible,
// //       loadMore: () => {
// //         if (!data.value) return;
// //         lastVisible.value = data.value[data.value.length - 1];
// //       },
// //     }
// //   }, { server: false, watch: [lastVisible] });
// // }

// // // export const useCachedInfiniteDocs = <T>(
// // //   args: QueryParams
// // // ) => {

// // //   const { orderBy } = args;

// // //   const queryKey = useCacheKey<QueryParams>(args);

// // //   const orderKey = orderBy?.key || 'createdAt';
// // //   const order = orderBy?.order || 'desc';

// // //   return useInfiniteQuery({
// // //     queryKey,
// // //     queryFn: (pageParam) => getCachedDocs<T>(args, pageParam),
// // //     getNextPageParam: (lastPage) => {
// // //       console.log('lastPage', lastPage)
// // //       if (lastPage.length === 0) return;
// // //       const lastPost = order === 'desc' ?
// // //         minBy(lastPage as { [key: string]: any }[], orderKey) :
// // //         maxBy(lastPage as { [key: string]: any }[], orderKey);
// // //       return lastPost;
// // //     },
// // //   });
// // // }

// // export const useCachedDocs = <
// //   TQueryKey extends string[] | [string, (Record<string, unknown> | string)?],
// //   TQueryFnData,
// //   TError,
// //   TData = TQueryFnData,
// // >(
// //   queryKey: TQueryKey,
// //   queryFn: (params: TQueryKey[1]) => Promise<TQueryFnData>,
// //   option?: Omit<
// //     UseQueryOptions<unknown, TError, TData, TQueryKey>,
// //     'queryKey' | 'queryFn'
// //   >
// // ) => {
// //   return useQuery({
// //     queryKey,
// //     queryFn,
// //     ...option,
// //   });
// // };

// export const useCachedDocs = <T>(args: QueryParams<T>) => {
//   // const { initialData } = args;
//   return useQuery({
//     // queryKey: useCacheKey(args),
//     queryKey: ['test'],
//     queryFn: () => getCachedDocs<T>(args),
//     // initialData,
//   });
// };

// // import {
// //   getFirestore,
// //   collection,
// //   query,
// //   where,
// //   limit,
// //   orderBy,
// //   getDocs,
// //   DocumentReference,
// //   DocumentData,
// //   onSnapshot,
// //   OrderByDirection,
// //   startAfter,
// // } from 'firebase/firestore';
// // import { useCacheKey } from './useCacheKey';
// // import { useFirebase } from '~/composables/firebase/useFirebase';
// // import { maxBy, minBy } from '~~/utils/array';
