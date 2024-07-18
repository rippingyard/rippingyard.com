import { useStorage } from './useStorage.server';

export const useBucket = () => {
  console.log(
    'process.env.VITE_FIREBASE_STORAGE_BUCKET',
    process.env.VITE_FIREBASE_STORAGE_BUCKET
  );
  return useStorage().bucket(process.env.VITE_FIREBASE_STORAGE_BUCKET);
};
