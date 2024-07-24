import { getStorage } from 'firebase-admin/storage';

import { useFirebase } from './useFirebase.server';

export const useStorage = () => {
  const app = useFirebase();
  const storage = getStorage(app);
  console.log('storage', storage);
  return storage;
};
