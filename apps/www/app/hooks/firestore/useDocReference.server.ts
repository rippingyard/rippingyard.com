import { DocumentReference } from 'firebase-admin/firestore';

import { useFirestore } from './useFirestore.server';

export const useDocReference = (
  arg?: string | DocumentReference,
  collection?: string
) => {
  try {
    if (!arg) throw new Error('Unset an arg');
    if (typeof arg !== 'string') return arg;
    if (!collection) throw new Error('Unset a collection');

    return useFirestore().doc(`${collection}/${arg}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
