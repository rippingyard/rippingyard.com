import { FirebaseApp } from 'firebase/app';

export const useFirebase = () => {
  return {
    fb: useState<FirebaseApp>('fb').value
  }
}