import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, DocumentData, getDoc, getFirestore } from 'firebase/firestore';

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

  const me = ref();
  const fb = initializeApp(config);
  const auth = getAuth(fb);

  onAuthStateChanged(auth, async () => {
    if (!auth?.currentUser) {
      me.value = ref();
      return;
    }

    console.log('onAuthStateChanged', auth?.currentUser?.uid);
    const db = getFirestore(fb);
    const q = doc(db, 'users', auth?.currentUser?.uid);
    const snapshot = await getDoc<DocumentData>(q);
    me.value = snapshot.data();
  });

  return {
    provide: {
      fb,
      me,
    }
  }
});