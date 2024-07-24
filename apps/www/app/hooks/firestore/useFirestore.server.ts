import { getFirestore } from 'firebase-admin/firestore';

import { useFirebase } from '../firebase/useFirebase.server';

export const useFirestore = () => {
  const app = useFirebase();
  const firestore = getFirestore(app);
  console.log('firestore', firestore);
  return firestore;
};
