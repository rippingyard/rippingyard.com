import { getStorage, connectStorageEmulator } from 'firebase/storage';

import { useFirebase } from './useFirebase';

export const useStorage = () => {
  const { fb } = useFirebase();
  const storage = getStorage(fb);

  // Emulator接続設定
  if (
    import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true' &&
    typeof window !== 'undefined'
  ) {
    if (!(storage as any).emulatorAlreadyInitialized) {
      connectStorageEmulator(storage, 'localhost', 9199);
      (storage as any).emulatorAlreadyInitialized = true;
    }
  }

  return { storage };
};
