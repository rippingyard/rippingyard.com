import { useStorage } from './useStorage.server';

export const useBucket = () =>
  useStorage().bucket(process.env.VITE_FIREBASE_STORAGE_BUCKET);
