import {
  getFirestore,
  collection,
  query,
  // where,
  getDocs,
} from 'firebase/firestore';

import firebase from '~~/composables/firebase/init';

export const usePosts = () => {
  const db = getFirestore(firebase);
  console.log('firebase', firebase);

  const isLoading = ref(true);
  const data = ref<any[]>([]);
  const errors = ref(null);

  const getPosts = async () => {
    const q = query(
      collection(db, 'users'),
    );
    const querySnapshot = await getDocs(q);
    console.log('querySnapshot', querySnapshot);

    querySnapshot.forEach((doc) => {
      data.value.push(doc.data());
    });

    isLoading.value = false;
  }

  getPosts();

  return {
    data,
    errors,
    isLoading,
  };
};