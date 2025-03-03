/**
 * Firestoreデータのシリアライズとデシリアライズのためのユーティリティ
 * サーバーサイドとクライアントサイドでのデータ形式の相互変換をサポート
 */

// サーバーサイドかどうかを判定
const isServer = typeof window === 'undefined';

// Firestoreのタイムスタンプ関連の型定義
interface TimestampLike {
  seconds: number;
  nanoseconds: number;
  toDate?: () => Date;
  toMillis?: () => number;
  isEqual?: (other: unknown) => boolean;
  valueOf?: () => string;
  toString?: () => string;
}

// シリアライズされたタイムスタンプの型
interface SerializedTimestamp {
  __type: 'timestamp';
  seconds: number;
  nanoseconds: number;
}

// 復元されたタイムスタンプの型
interface DeserializedTimestamp extends SerializedTimestamp {
  toDate: () => Date;
  toMillis: () => number;
  isEqual: (other: unknown) => boolean;
  valueOf: () => string;
  toString: () => string;
}

// ドキュメント参照関連の型定義
interface DocRefLike {
  id?: string;
  path?: string;
  firestore?: unknown;
  parent?: {
    id?: string;
    path?: string;
  };
}

// シリアライズされたドキュメント参照の型
interface SerializedDocRef {
  __type: 'docref';
  id: string;
  path: string;
}

// 復元されたドキュメント参照の型
interface DeserializedDocRef extends SerializedDocRef {
  parent: {
    id: string;
    path: string;
  };
}

/**
 * Firestoreのタイムスタンプをシンプルなオブジェクトに変換または復元する
 * - サーバーサイド: 単純なオブジェクトに変換してシリアライズ可能にする
 * - クライアントサイド: 必要なメソッドを復元する
 */
export function processTimestamp(
  timestamp: TimestampLike | SerializedTimestamp | null | undefined
):
  | TimestampLike
  | SerializedTimestamp
  | DeserializedTimestamp
  | null
  | undefined {
  // nullやundefinedは処理しない
  if (!timestamp) return timestamp;

  // すでに__type: 'timestamp'を持つオブジェクトなら、クライアントサイドで必要なメソッドを追加
  if (
    !isServer &&
    'seconds' in timestamp &&
    'nanoseconds' in timestamp &&
    '__type' in timestamp &&
    timestamp.__type === 'timestamp'
  ) {
    const { seconds, nanoseconds } = timestamp;
    return {
      __type: 'timestamp',
      seconds,
      nanoseconds,
      // タイムスタンプのメソッドを追加
      toDate: () => new Date(seconds * 1000),
      toMillis: () => seconds * 1000,
      isEqual: (other: unknown) => {
        if (!other || typeof other !== 'object') return false;
        const otherTS = other as Record<string, unknown>;
        return (
          seconds === Number(otherTS.seconds) &&
          nanoseconds === Number(otherTS.nanoseconds)
        );
      },
      toString: () => new Date(seconds * 1000).toISOString(),
      valueOf: () => `${seconds}.${nanoseconds}`,
    } as DeserializedTimestamp;
  }

  // サーバーサイドでTimestampオブジェクトをシリアライズ可能な形式に変換
  if (isServer && 'seconds' in timestamp && 'nanoseconds' in timestamp) {
    return {
      __type: 'timestamp',
      seconds: timestamp.seconds,
      nanoseconds: timestamp.nanoseconds,
    } as SerializedTimestamp;
  }

  // その他の場合はそのまま返す
  return timestamp;
}

/**
 * Firestoreのドキュメント参照をシンプルなオブジェクトに変換または復元する
 */
export function processDocRef(
  docRef: DocRefLike | SerializedDocRef | null | undefined
): DocRefLike | SerializedDocRef | DeserializedDocRef | null | undefined {
  // nullやundefinedは処理しない
  if (!docRef) return docRef;

  // すでに__type: 'docref'を持つオブジェクトなら、クライアントサイドで必要なプロパティを追加
  if (
    !isServer &&
    'id' in docRef &&
    'path' in docRef &&
    (
      docRef as {
        __type: unknown;
      }
    ).__type === 'docref'
  ) {
    const { id, path } = docRef;
    if (typeof path !== 'string') return docRef;

    return {
      __type: 'docref',
      id,
      path,
      // 標準的なドキュメント参照のプロパティにアクセスできるようにする
      get parent() {
        const pathParts = path.split('/');
        pathParts.pop();
        return {
          id: pathParts[pathParts.length - 1],
          path: pathParts.join('/'),
        };
      },
    } as DeserializedDocRef;
  }

  // サーバーサイドでDocumentReferenceをシリアライズ可能な形式に変換
  if (isServer && 'path' in docRef && 'id' in docRef && 'firestore' in docRef) {
    if (typeof docRef.path !== 'string' || typeof docRef.id !== 'string')
      return docRef;

    return {
      __type: 'docref',
      id: docRef.id,
      path: docRef.path,
    } as SerializedDocRef;
  }

  // その他の場合はそのまま返す
  return docRef;
}

/**
 * Firestoreデータを処理する
 * - サーバーサイド: シリアライズ可能な形式に変換
 * - クライアントサイド: 必要なメソッドを復元
 * @param data 処理するデータ
 * @param visited 循環参照検出用
 * @returns 処理されたデータ
 */
export function processFirestoreData<T>(
  data: T,
  visited: WeakSet<object> = new WeakSet()
): T {
  // nullやundefinedは処理しない
  if (data === null || data === undefined) {
    return data;
  }

  // 基本型はそのまま返す
  if (typeof data !== 'object') {
    return data;
  }

  // 循環参照検出
  if (visited.has(data as object)) {
    return data; // 既に処理したオブジェクトは再処理しない
  }

  // 処理中のオブジェクトを記録
  visited.add(data as object);

  // 配列の場合は各要素を処理
  if (Array.isArray(data)) {
    return data.map((item) =>
      processFirestoreData(item, visited)
    ) as unknown as T;
  }

  // Timestampの処理
  if (
    (data as any).__type === 'timestamp' ||
    (isServer &&
      (data as any).seconds !== undefined &&
      (data as any).nanoseconds !== undefined)
  ) {
    return processTimestamp(data) as unknown as T;
  }

  // DocumentReferenceの処理
  if (
    (data as any).__type === 'docref' ||
    (isServer &&
      (data as any).path &&
      (data as any).id &&
      (data as any).firestore)
  ) {
    return processDocRef(data) as unknown as T;
  }

  // 通常のオブジェクトの場合は再帰的に処理
  const result = { ...(data as object) } as Record<string, unknown>;

  // 特定のキーや特定のタイプのオブジェクトを処理から除外
  const skipKeys = ['global', 'window', 'document', 'console', 'process'];

  for (const [key, value] of Object.entries(result)) {
    // 特定のキーはスキップ
    if (skipKeys.includes(key)) continue;

    // nullやundefinedはそのまま
    if (value === null || value === undefined) continue;

    // オブジェクトのみ再帰処理
    if (typeof value === 'object') {
      result[key] = processFirestoreData(value, visited);
    }
  }

  return result as unknown as T;
}

// 後方互換性のための別名
export const adaptFirestoreData = processFirestoreData;
