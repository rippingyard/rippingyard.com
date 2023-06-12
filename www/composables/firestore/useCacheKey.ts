export const useCacheKey = <T>(args: T): any[] => {
  const keys = Object.keys(args as { [key: string]: any }).sort();

  if (keys.length === 0) return [];

  const v = keys.map(k => {
    const value = (args as { [key: string]: any })[k];
    return [
      k,
      isProxy(value) && value?.path ? value?.path : value,
    ]
  });

  console.log('cacheKeys', v.flat(3));
  return v.flat(3);
}