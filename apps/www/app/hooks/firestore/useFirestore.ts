import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

import { useFirebase } from '../firebase/useFirebase';

export const useFirestore = () => {
  const { fb, databaseId } = useFirebase();
  const db = getFirestore(fb, databaseId);

  // Emulator接続設定
  if (
    import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true' &&
    typeof window !== 'undefined'
  ) {
    if (!(db as any).emulatorAlreadyInitialized) {
      connectFirestoreEmulator(db, 'localhost', 8080);
      (db as any).emulatorAlreadyInitialized = true;
    }
  }

  return { db };
};
