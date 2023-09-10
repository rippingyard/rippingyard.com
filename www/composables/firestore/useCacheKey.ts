export const useCacheKey = <T>(args: T): string => {
  const keys = Object.keys(args as { [key: string]: any }).sort();

  if (keys.length === 0) return '';

  const v = keys.map(k => {
    const value = (args as { [key: string]: any })[k];
    const filteredValue = typeof value !== 'object' || isProxy(value) ? value : useCacheKey(value);
    return [
      k,
      isProxy(value) && value?.path ? value?.path : filteredValue,
    ].join('-')
  });

  console.log('cacheKeys', v.join('-'));
  return v.join('-');
}