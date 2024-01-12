import { doc, DocumentReference } from 'firebase/firestore';

import { useFirestore } from './useFirestore';

export const useDocReference = (
  arg?: string | DocumentReference,
  collection?: string
) => {
  try {
    if (!arg) throw new Error('Unset an arg');
    if (typeof arg !== 'string') return arg;
    if (!collection) throw new Error('Unset a collection');

    const { db } = useFirestore();
    return doc(db, collection, arg);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
