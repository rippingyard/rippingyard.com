import { DocumentReference } from 'firebase-admin/firestore';

import { normalizeTimestamps } from '~/utils/timestamp';

import { useDocReference } from './useDocReference.server';

export type DocParams<T> = {
  collection?: string;
  id?: string;
  ref?: DocumentReference<T>;
};

export const useDoc = async <T>(args: DocParams<T>) => {
  try {
    const { collection, id, ref } = args;
    const docRef = ref
      ? useDocReference(ref.id, ref.parent.id || undefined)
      : useDocReference(id, collection);
    const snapshot = await docRef.get();

    if (!snapshot.exists) return;

    // React Routerのシリアライズ時にTimestampメソッドが失われる問題を解決するために
    // Timestampを含むオブジェクトを正規化する
    const data = snapshot.data() as Record<string, unknown>;
    return normalizeTimestamps(data) as T;
  } catch (e) {
    console.error('useDoc.server error', e);
    throw e;
  }
};
