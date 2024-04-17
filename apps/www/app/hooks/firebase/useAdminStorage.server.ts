import { useFirebase } from './useFirebase.server';

export const useAdminStorage = () => useFirebase().storage();
