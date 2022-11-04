import { getAuth } from 'firebase/auth'
import { useAuth as useFirebaseAuth } from '@vueuse/firebase/useAuth'
import firebase from '~/composables/firebase/init'

export const useAuth = () => {
  return useFirebaseAuth(getAuth(firebase))
}