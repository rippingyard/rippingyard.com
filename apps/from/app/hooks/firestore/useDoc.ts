import { DocumentData, DocumentReference, getDoc } from 'firebase/firestore';

import { useDocReference } from './useDocReference';

export type DocParams<T> = {
  collection?: string;
  id?: string;
  ref?: DocumentReference<T>;
};

export const useDoc = async <T>(args: DocParams<T>) => {
  try {
    const { collection, id, ref } = args;
    const snapshot = await getDoc<DocumentData, DocumentData>(
      ref
        ? useDocReference(ref.id, ref.parent.id || undefined)
        : useDocReference(id, collection)
    );
    // console.log('useDoc snapshot', snapshot);

    if (!snapshot.exists()) return {} as T;

    return snapshot.data() as T;
  } catch (e) {
    console.error('useDoc error', e);
    throw e;
  }
};
