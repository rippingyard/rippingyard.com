import { Timestamp } from 'firebase-admin/firestore';

/**
 * サーバーサイド用: Timestampをシリアライズのためにシンプルなオブジェクトに変換
 * 関数をプロパティとして持たないようにする
 */
export const serializeTimestamp = (timestamp: Timestamp | null | undefined) => {
  if (!timestamp) return null;

  // すでにシリアライズ済みかチェック
  if (typeof timestamp.toDate !== 'function') {
    return timestamp;
  }

  // シンプルな値のみを持つオブジェクトを返す
  return {
    _type: 'timestamp',
    seconds: timestamp.seconds,
    nanoseconds: timestamp.nanoseconds,
  };
};

// タイムスタンプのシリアライズ形式の型定義
interface SerializedTimestamp {
  _type: 'timestamp';
  seconds: number;
  nanoseconds: number;
}

// タイムスタンプの復元形式の型定義
interface DeserializedTimestamp {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
  toMillis: () => number;
  isEqual: (
    other: { seconds?: number; nanoseconds?: number } | null | undefined
  ) => boolean;
  toString: () => string;
}

/**
 * クライアントサイド用: シリアライズされたタイムスタンプを使いやすい形式に復元
 */
export const deserializeTimestamp = (
  obj: unknown
): DeserializedTimestamp | unknown => {
  if (!obj) return null;

  // タイプガードでタイムスタンプデータかチェック
  const isSerializedTimestamp = (obj: unknown): obj is SerializedTimestamp =>
    typeof obj === 'object' &&
    obj !== null &&
    '_type' in obj &&
    (obj as any)._type === 'timestamp' &&
    'seconds' in obj &&
    'nanoseconds' in obj;

  if (isSerializedTimestamp(obj)) {
    return {
      seconds: obj.seconds,
      nanoseconds: obj.nanoseconds,
      // タイムスタンプの便利メソッドを追加
      toDate: () => new Date(obj.seconds * 1000),
      toMillis: () =>
        obj.seconds * 1000 + Math.floor(obj.nanoseconds / 1000000),
      isEqual: (
        other: { seconds?: number; nanoseconds?: number } | null | undefined
      ) =>
        obj.seconds === other?.seconds &&
        obj.nanoseconds === other?.nanoseconds,
      toString: () => new Date(obj.seconds * 1000).toISOString(),
    };
  }

  return obj;
};

/**
 * サーバーサイド用: オブジェクト内のTimestampをシリアライズ可能な形式に変換
 */
export const serializeTimestamps = <T extends Record<string, unknown>>(
  obj: Readonly<T>,
  visited: WeakSet<object> = new WeakSet()
): Record<string, unknown> => {
  if (!obj || typeof obj !== 'object') return obj;

  // 循環参照を検出して無限再帰を防止
  if (visited.has(obj)) {
    return obj;
  }

  visited.add(obj);
  // イミュータブルに扱うために新しいオブジェクトを作成
  const result: Record<string, unknown> = { ...obj };

  // オブジェクトの各プロパティを処理
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (!value) return;

    // Timestamp型かチェック
    const isTimestamp =
      typeof value === 'object' &&
      value !== null &&
      (value instanceof Timestamp ||
        ('seconds' in value &&
          'nanoseconds' in value &&
          typeof (value as Record<string, unknown>).toDate === 'function'));

    // Timestamp型の場合
    if (isTimestamp) {
      result[key] = serializeTimestamp(value as unknown as Timestamp);
    }
    // ネストされたオブジェクトの場合
    else if (typeof value === 'object' && !Array.isArray(value)) {
      result[key] = serializeTimestamps(
        value as Record<string, unknown>,
        visited
      );
    }
    // 配列の場合
    else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        item && typeof item === 'object'
          ? serializeTimestamps(item as Record<string, unknown>, visited)
          : item
      );
    }
  });

  return result;
};

/**
 * クライアントサイド用: シリアライズされたタイムスタンプを含むオブジェクトを復元
 */
export const deserializeTimestamps = <T>(
  obj: T,
  visited: WeakSet<object> = new WeakSet()
): T => {
  if (!obj || typeof obj !== 'object') return obj;

  if (visited.has(obj as object)) {
    return obj;
  }

  visited.add(obj as object);

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      item && typeof item === 'object'
        ? deserializeTimestamps(item, visited)
        : item
    ) as unknown as T;
  }

  // イミュータブルに扱うために新しいオブジェクトを作成
  const result: Record<string, unknown> = {
    ...(obj as Record<string, unknown>),
  };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (!value) return;

    // シリアライズされたタイムスタンプかチェック
    const isSerializedTimestamp =
      typeof value === 'object' &&
      value !== null &&
      '_type' in value &&
      (value as any)._type === 'timestamp' &&
      'seconds' in value &&
      'nanoseconds' in value;

    // シリアライズされたTimestamp型の場合
    if (isSerializedTimestamp) {
      result[key] = deserializeTimestamp(value);
    }
    // ネストされたオブジェクトの場合
    else if (typeof value === 'object') {
      result[key] = deserializeTimestamps(value, visited);
    }
  });

  return result as unknown as T;
};

// 後方互換性のために古い関数名をエクスポート
export const normalizeTimestamp = serializeTimestamp;
export const normalizeTimestamps = serializeTimestamps;
