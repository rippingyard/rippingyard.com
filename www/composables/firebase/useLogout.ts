import { getAuth, signOut } from 'firebase/auth'
import { useFirebase } from './useFirebase';

export const useLogout = async () => {
  try {
    const { fb } = useFirebase();
    const auth = getAuth(fb);
    await signOut(auth);
  } catch (e) {
    console.error(e);
  }
};