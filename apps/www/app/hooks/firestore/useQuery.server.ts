import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore';

import { useFirestore } from './useFirestore.server';
import { QueryParams, defaultOp } from '../condition/usePostConditions';

export const useQuery = async <T>(
  args: QueryParams<T>
): Promise<{
  data: T[];
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
}> => {
  const data: T[] = [];
  // const ids: string[] = [];
  const { removeWhereKeys = [] } = args;

  let q: Query<DocumentData, DocumentData> = useFirestore().collection(
    args.collection
  );

  if (args?.where) {
    const logrows = [];
    for (const w of args.where) {
      if (!removeWhereKeys.includes(w.key)) {
        logrows.push({
          key: w.key,
          // val: Array.isArray(w.val) ? w.val.join(', ') : w.val,
          val: w.val,
        });
        q = q.where(w.key, w?.op || defaultOp(w.val), w.val);
      }
    }
    console.table(logrows);
  }

  if (args?.limit && args?.limit > 0) q = q.limit(args.limit);

  if (args?.orderBy) {
    const order = args.orderBy.order || 'desc';
    q = q.orderBy(args.orderBy.key, order);
    if (args?.lastVisible) {
      q = q.startAfter(args?.lastVisible);
    }
    if (args?.startAfter) {
      q = q.startAfter(args?.startAfter);
    }
  }

  const snapshots = await q.get();
  const lastVisible = snapshots.docs[snapshots.docs.length - 1] || undefined;

  snapshots.forEach((snapshot) => {
    data.push(snapshot.data() as T);
    // ids.push(doc.id);
  });

  return { data, lastVisible };
};
