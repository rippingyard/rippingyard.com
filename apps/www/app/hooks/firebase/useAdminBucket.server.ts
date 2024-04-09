import { useAdminStorage } from './useAdminStorage.server';

export const useAdminBucket = () => useAdminStorage().bucket();
