import { getAuth } from 'firebase/auth';

import { useFirebase } from './useFirebase';

export const useAuth = () => {
  const { fb } = useFirebase();
  return getAuth(fb);
};
