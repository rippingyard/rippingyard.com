import { useFirebase } from '../firebase/useFirebase.server';

export const useFirestore = () => useFirebase().firestore();
