import { getStorage } from 'firebase/storage';

import { useFirebase } from './useFirebase';

export const useStorage = () => {
  const { fb } = useFirebase();
  return { storage: getStorage(fb) };
};
