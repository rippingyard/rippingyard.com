import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, DocumentData, DocumentReference, getDoc, getFirestore } from 'firebase/firestore';
import { User } from '~~/schemas/user';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
};

export default defineNuxtPlugin(() => {

  const me = ref<User | undefined>();
  const myRef = ref<DocumentReference>();
  const fb = initializeApp(config);
  const auth = getAuth(fb);

  onAuthStateChanged(auth, async () => {
    if (!auth?.currentUser) {
      me.value = undefined;
      return;
    }

    console.log('onAuthStateChanged', auth?.currentUser?.uid);
    const db = getFirestore(fb);
    const q = doc(db, 'users', auth?.currentUser?.uid);
    myRef.value = q;
    const snapshot = await getDoc<DocumentData>(q);
    me.value = snapshot.data() as User;
  });

  return {
    provide: {
      fb,
      me,
      myRef,
    }
  }
});