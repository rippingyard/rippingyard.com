import { useFirebase } from './useFirebase.server';

export const useStorage = () => {
  const storage = useFirebase().storage();
  console.log('Storage config:', storage);
  return storage;
};
