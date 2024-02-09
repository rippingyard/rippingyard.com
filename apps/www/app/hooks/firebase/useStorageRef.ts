import { ref } from 'firebase/storage';

import { useStorage } from '../firebase/useStorage';

export const useStorageRef = (path: string) => {
  const { storage } = useStorage();
  return ref(storage, path);
};
