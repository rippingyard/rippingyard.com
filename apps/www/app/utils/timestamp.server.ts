import { Timestamp, DocumentReference } from 'firebase-admin/firestore';

/**
 * サーバーサイドでFirestoreのデータをシリアライズ可能な形式に変換する関数
 * 単純なJSONオブジェクトのみを持ち、関数プロパティを含まないようにする
 */
export function simplifyFirestoreData<T>(data: T): unknown {
  if (data === null || data === undefined) {
    return data;
  }

  // 基本型（文字列、数値、真偽値）はそのまま返す
  if (typeof data !== 'object') {
    return data;
  }

  // 配列の場合は各要素を再帰的に処理
  if (Array.isArray(data)) {
    return data.map(simplifyFirestoreData);
  }

  // Timestamp型の場合
  if (data instanceof Timestamp) {
    return {
      __type: 'timestamp',
      seconds: data.seconds,
      nanoseconds: data.nanoseconds,
    };
  }

  // DocumentReference型の場合
  if (isDocumentReference(data)) {
    return {
      __type: 'docref',
      path: data.path,
      id: data.id,
    };
  }

  // 通常のオブジェクトの場合は再帰的に各プロパティを処理
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    result[key] = simplifyFirestoreData(value);
  }

  return result;
}

// DocumentReferenceかどうかを判定するタイプガード
function isDocumentReference(obj: unknown): obj is DocumentReference {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'path' in obj &&
    typeof (
      obj as {
        path: unknown;
      }
    ).path === 'string' &&
    'id' in obj &&
    typeof (
      obj as {
        id: unknown;
      }
    ).id === 'string' &&
    'firestore' in obj
  );
}
