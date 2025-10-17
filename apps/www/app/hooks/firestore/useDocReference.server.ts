import { DocumentReference } from 'firebase-admin/firestore';

import { useFirestore } from './useFirestore.server';

export const useDocReference = (
  arg?: string | DocumentReference,
  collection?: string
) => {
  try {
    if (!arg) {
      console.error('useDocReference called with:', { arg, collection });
      throw new Error('useDocReference: arg is required');
    }
    if (typeof arg !== 'string') return arg;
    if (!collection) {
      console.error('useDocReference called with string arg but no collection:', { arg, collection });
      throw new Error('useDocReference: collection is required when arg is a string');
    }

    return useFirestore().doc(`${collection}/${arg}`);
  } catch (e) {
    console.error('useDocReference error:', e);
    console.error('Called with args:', { arg, collection });
    throw e;
  }
};
