import { getFirestore } from 'firebase/firestore';

import { useFirebase } from '../firebase/useFirebase';

export const useFirestore = () => {
  const { fb, databaseId } = useFirebase();
  return { db: getFirestore(fb, databaseId) };
};
