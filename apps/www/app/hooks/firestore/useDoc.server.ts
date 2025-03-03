﻿import { DocumentReference } from 'firebase-admin/firestore';

import { processFirestoreData } from '~/utils/firestore-adapter';

import { useDocReference } from './useDocReference.server';

export type DocParams<T> = {
  collection?: string;
  id?: string;
  ref?: DocumentReference<T>;
};

export const useDoc = async <T>(args: DocParams<T>) => {
  try {
    const { collection, id, ref } = args;

    // IDが空の場合は早期リターン
    if ((!id && !ref) || id === '') return;

    // ドキュメント参照を取得
    const docRef = ref
      ? useDocReference(ref.id, ref.parent.id || undefined)
      : useDocReference(id, collection);

    // ドキュメントスナップショットを取得
    const snapshot = await docRef.get();

    // ドキュメントが存在しない場合は早期リターン
    if (!snapshot.exists) return;

    // データを取得
    const data = snapshot.data();

    // シリアライズ可能な形式に変換して返す
    return processFirestoreData(data) as unknown as T;
  } catch (e) {
    console.error('useDoc.server error', e);
    throw e;
  }
};
