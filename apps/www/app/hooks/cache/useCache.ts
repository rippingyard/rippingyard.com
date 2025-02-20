export enum CACHE_KEYS {
  PUBLIC_POSTS = 'publicPosts',
  PUBLIC_NOTES = 'publicNotes',
  PUBLIC_ARTICLES = 'publicArticles',
}

type CacheObject<T> = {
  expired: number;
  items: T[];
};

const cacheItems = <T>(
  key: string,
  items: T[],
  expired: number = 600000
): void => {
  if (typeof sessionStorage === 'undefined') return;
  // sessionStorage.setItem(
  //   key,
  //   JSON.stringify({
  //     expired: Date.now() + expired,
  //     items,
  //   })
  // );
};

const getCachedItems = <T>(key: string): T[] => {
  if (typeof sessionStorage === 'undefined') return [];
  const cache = sessionStorage.getItem(key);
  if (!cache) return [];

  const cacheObject: CacheObject<T> = JSON.parse(cache);
  const now = Date.now();

  if (cacheObject?.expired < now) {
    sessionStorage.removeItem(key);
    return [];
  }

  return cacheObject?.items || [];
};

const clearCachedItems = () => {
  if (typeof sessionStorage === 'undefined') return;
  Object.values(CACHE_KEYS).forEach((key) => {
    sessionStorage.removeItem(key);
  });
};

export { cacheItems, getCachedItems, clearCachedItems };
