import {
  getFirestore,
  doc,
  DocumentReference,
} from 'firebase/firestore';
import { useFirebase } from '~/composables/firebase/useFirebase';

export const useDocReference = (arg?: string | DocumentReference, collection?: string) => {
  try {
    if (process.server) return;
    if (!arg) throw new Error('Unset an arg');
    if (typeof arg !== 'string') return arg;
    if (!collection) throw new Error('Unset a collection');

    const { fb } = useFirebase();
    return doc(getFirestore(fb), collection, arg);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
