import { useFirebase } from './useFirebase.server';

export const useStorage = () => useFirebase().storage();
