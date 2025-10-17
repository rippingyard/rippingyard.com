import { DocumentReference } from 'firebase-admin/firestore';

/**
 * FirestoreのDocumentReferenceを含むデータを安全にシリアライズ可能な形式に変換
 * DocumentReferenceは { id: string, path: string } の形式に変換
 */
export const sanitizeFirestoreData = <T>(data: T): T => {
  if (data === null || data === undefined) {
    return data;
  }

  if (data instanceof Date) {
    return data.toISOString() as unknown as T;
  }

  // DocumentReferenceの場合、idとpathを保持
  if (
    data &&
    typeof data === 'object' &&
    'id' in data &&
    'path' in data &&
    'firestore' in data
  ) {
    const ref = data as unknown as DocumentReference;
    return {
      id: ref.id,
      path: ref.path,
      _type: 'DocumentReference',
    } as unknown as T;
  }

  // Timestampの場合
  if (
    data &&
    typeof data === 'object' &&
    '_seconds' in data &&
    '_nanoseconds' in data
  ) {
    return data as T; // Timestampはそのまま保持
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeFirestoreData(item)) as unknown as T;
  }

  if (typeof data === 'object') {
    const sanitized: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        sanitized[key] = sanitizeFirestoreData((data as any)[key]);
      }
    }
    return sanitized as T;
  }

  return data;
};

/**
 * シリアライズされたDocumentReferenceからIDを取得
 */
export const getDocumentReferenceId = (ref: any): string | undefined => {
  if (!ref) return undefined;

  // 元のDocumentReferenceの場合
  if (ref.id && typeof ref.id === 'string') {
    return ref.id;
  }

  // シリアライズされた形式の場合
  if (ref._type === 'DocumentReference' && ref.id) {
    return ref.id;
  }

  return undefined;
};
