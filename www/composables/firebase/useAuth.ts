import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuth as useFirebaseAuth } from '@vueuse/firebase/useAuth';
import { FirebaseApp } from 'firebase/app';

export const useAuth = () => {
  const result = ref<any>({
    isAuthenticated: false,
    user: undefined,
  });

  onMounted(() => {
    const auth = getAuth(useState<FirebaseApp>('fb').value);
    result.value = useFirebaseAuth(auth);

    onAuthStateChanged(auth, user => {
      result.value = useFirebaseAuth(auth);
      console.log('onAuthStateChanged', result.value, user)
    });
  })

  return result;
}