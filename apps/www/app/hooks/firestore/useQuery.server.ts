import { DocumentData, FieldValue, Query } from 'firebase-admin/firestore';

import { sanitizeFirestoreData } from '~/utils/sanitizeFirestoreData';

import { useFirestore } from './useFirestore.server';
import { QueryParams, defaultOp } from '../condition/usePostConditions';

export const useQuery = async <T>(
  args: QueryParams<T>
): Promise<{
  data: T[];
  lastVisible?: any; // クライアントに送信しない内部使用のみ
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

  if (args?.findNearest) {
    q = q.findNearest('vector', FieldValue.vector(args?.findNearest.vector), {
      limit: args?.findNearest?.limit || 5,
      distanceMeasure: args?.findNearest?.distanceMeasure || 'COSINE',
    }) as unknown as Query<DocumentData, DocumentData>; // Firestoreのアップデート待ち
  } else if (args?.orderBy) {
    // OrderByとfindNearestは同時に使用できない
    // Firestoreの仕様上、orderByを使用する場合は必ずindexが必要
    // https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
    const order = args.orderBy.order || 'desc';
    q = q.orderBy(args.orderBy.key, order);
    // lastVisibleは使用しない
    // if (args?.lastVisible) {
    //   q = q.startAfter(args?.lastVisible);
    // }
    if (args?.startAfter) {
      q = q.startAfter(args?.startAfter);
    }
  }

  const snapshots = await q.get();
  // lastVisibleはサーバーサイドのページネーション用で使用されていないため削除
  // const lastVisible = snapshots.docs[snapshots.docs.length - 1] || undefined;

  snapshots.forEach((snapshot) => {
    data.push(snapshot.data() as T);
    // ids.push(doc.id);
  });

  // Firebaseの参照が含まれないようにデータをクリーンアップ
  // DocumentReferenceのidを保持しつつ、安全にシリアライズ
  const cleanData = sanitizeFirestoreData(data);

  // lastVisibleはクライアントに送信しない
  return { data: cleanData, lastVisible: undefined };
};
