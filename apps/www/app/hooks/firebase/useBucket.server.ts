import { useStorage } from './useStorage.server';

export const useBucket = () => {
  const bucketName = process.env.VITE_FIREBASE_STORAGE_BUCKET;
  console.log('Using bucket:', bucketName);
  return useStorage().bucket(bucketName);
};
