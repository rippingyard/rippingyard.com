﻿import { SerializeFrom } from '@vercel/remix';

export enum CACHE_KEYS {
  PUBLIC_POSTS = 'publicPosts',
}

type CacheObject<T> = {
  expired: number;
  items: SerializeFrom<T>[];
};

const cacheItems = <T>(
  key: CACHE_KEYS,
  items: T[],
  expired: number = 600000
): void => {
  if (typeof sessionStorage === 'undefined') return;
  console.log('expiredAt', Date.now() + expired);
  sessionStorage.setItem(
    key,
    JSON.stringify({
      expired: Date.now() + expired,
      items,
    })
  );
};

const getCachedItems = <T>(key: string): SerializeFrom<T>[] => {
  if (typeof sessionStorage === 'undefined') return [];
  const cache = sessionStorage.getItem(key);
  if (!cache) return [];

  const cacheObject: CacheObject<T> = JSON.parse(cache);
  const now = Date.now();

  if (cacheObject?.expired < now) {
    sessionStorage.removeItem(key);
    return [];
  }
  console.log('cacheObject?.items', cacheObject?.items);
  return cacheObject?.items || [];
};

const clearCachedItems = () => {
  if (typeof sessionStorage === 'undefined') return;
  Object.values(CACHE_KEYS).forEach((key) => {
    sessionStorage.removeItem(key);
  });
};

export { cacheItems, getCachedItems, clearCachedItems };
