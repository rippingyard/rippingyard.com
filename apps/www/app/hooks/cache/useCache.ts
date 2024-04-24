import { SerializeFrom } from '@vercel/remix';

export enum CACHE_KEYS {
  PUBLIC_POSTS = 'publicPosts',
}

const getCachedItems = <T>(key: string): SerializeFrom<T>[] => {
  if (typeof sessionStorage === 'undefined') return [];
  const cache = sessionStorage.getItem(key);
  return cache ? JSON.parse(cache) : [];
};

const clearCachedItems = () => {
  if (typeof sessionStorage === 'undefined') return;
  Object.values(CACHE_KEYS).forEach((key) => {
    console.log('CACHE_KEYS', key);
    sessionStorage.removeItem(key);
  });
};

export { getCachedItems, clearCachedItems };
