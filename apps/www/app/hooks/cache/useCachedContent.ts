export enum CACHE_KEYS {
  PUBLIC_POSTS = 'publicPosts',
}

const setCachedContent = (key: string, value: string) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(cacheKey(key), value);
};

const getCachedContent = (key: string) => {
  if (typeof localStorage === 'undefined') return '';
  return localStorage.getItem(cacheKey(key)) || '';
};

const clearCachedContent = (key: string) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(cacheKey(key));
};

const cacheKey = (key: string) => `cachedContent-${key}`;

export const useCachedContent = () => {
  return { setCachedContent, getCachedContent, clearCachedContent };
};
