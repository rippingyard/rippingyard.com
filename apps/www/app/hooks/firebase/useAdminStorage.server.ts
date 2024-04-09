import { useAdmin } from './useAdmin.server';

export const useAdminStorage = () => useAdmin().storage();
