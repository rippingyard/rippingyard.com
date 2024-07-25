import { useStorage } from './useStorage.server';

export const useBucket = () => useStorage().bucket();
