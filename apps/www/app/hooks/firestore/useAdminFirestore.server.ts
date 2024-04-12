import { useAdmin } from '../firebase/useAdmin.server';

export const useAdminFirestore = () => useAdmin().firestore();
