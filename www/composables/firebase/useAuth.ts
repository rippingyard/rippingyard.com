import { getAuth } from 'firebase/auth';
import { useAuth as useFirebaseAuth } from '@vueuse/firebase/useAuth';
import { useFirebase } from './useFirebase';

export const useAuth = (): ReturnType<typeof useFirebaseAuth> => {
  const { fb } = useFirebase();

  if (!fb) return {
    isAuthenticated: computed(() => false),
    user: ref(null),
  };

  const auth = getAuth(fb);

  return useFirebaseAuth(auth);

}