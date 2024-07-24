import { useFirebase } from './useFirebase.server';

export const useStorage = () => {
  const storage = useFirebase().storage();
  console.log('storage', storage);
  return storage;
};
