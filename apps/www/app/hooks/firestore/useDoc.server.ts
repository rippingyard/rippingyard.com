import { DocumentReference } from 'firebase-admin/firestore';

import { sanitizeFirestoreData } from '~/utils/sanitizeFirestoreData';

import { useDocReference } from './useDocReference.server';

export type DocParams<T> = {
  collection?: string;
  id?: string;
  ref?: DocumentReference<T>;
};

export const useDoc = async <T>(args: DocParams<T>) => {
  try {
    const { collection, id, ref } = args;

    // idまたはrefが必須
    if (!id && !ref) {
      throw new Error('useDoc: id or ref is required');
    }

    const docRef = ref
      ? useDocReference(ref.id, ref.parent.id || undefined)
      : useDocReference(id, collection);
    const snapshot = await docRef.get();

    if (!snapshot.exists) return;

    const data = snapshot.data() as T;
    // Firebaseの参照が含まれないようにデータをクリーンアップ
    // DocumentReferenceのidを保持しつつ、安全にシリアライズ
    return sanitizeFirestoreData(data);
  } catch (e) {
    console.error('useDoc.server error', e);
    throw e;
  }
};
