import { useStorage } from './useStorage.server';

export const useBucket = () => {
  const bucket = useStorage().bucket();
  console.log('bucket', bucket);
  return bucket;
};
