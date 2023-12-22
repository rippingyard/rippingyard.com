import { DocumentReference } from "firebase/firestore";

const getCacheKey = <T>(args: T) => {
  const keys = Object.keys(args as { [key: string]: any }).sort();

  if (keys.length === 0) return '';

  const v = keys.map(k => {
    const value = (args as { [key: string]: any })[k];
    if (!value) return [];
    return [
      k,
      sanitizeValue(value),
    ].join('-')
  });

  console.log('cacheKeys:', v.join('-'));
  return v.join('-');
}

const sanitizeValue = (value: unknown): string | number => {
  const type = getValueType(value);
  console.log('cacheKeys:', type, value);

  if (type === 'string') return value as string;
  if (type === 'boolean') return value ? '1' : '0';

  if (type === 'ref') {
    const proxyData = value as any;
    if (proxyData?.path) return proxyData.path;
  }
  if (type === 'array') {
    return (value as any[]).map(v => sanitizeValue(v)).join('-');
  }
  if (type === 'object') {
    const obj = value as { [key: string]: any };
    const keys = Object.keys(value as object).sort();
    const paths: string[] = [];
    for (const key of keys) {
      paths.push(`${key}-${sanitizeValue(obj[key])}`);
    }
    return paths.join('.');
  }

  return (value as number).toString();
}

const getValueType = (value: unknown) => {
  const type = typeof value;
  if (type !== 'object') return type;
  if (Array.isArray(value)) return 'array';
  if (value instanceof DocumentReference) return 'ref';
  return 'object';
}

export const useCacheKey = <T>(args: T): string => {
  return getCacheKey<T>(args);
}