import { Timestamp } from 'firebase-admin/firestore';

/**
 * FirestoreのTimestampをシリアライズ可能な形式に変換する
 * React Router v7ではデータのシリアライズ時にメソッドが失われるため、
 * 必要なデータをオブジェクトとして抽出する
 */
export const normalizeTimestamp = (timestamp: Timestamp) => {
  if (!timestamp) return timestamp;

  // すでに変換済みかチェック
  if (typeof timestamp.toDate === 'undefined') {
    return {
      seconds: timestamp.seconds,
      nanoseconds: timestamp.nanoseconds,
      // メソッドを追加
      toDate: () => new Date(timestamp.seconds * 1000),
      toMillis: () =>
        timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000),
      isEqual: (
        other: { seconds?: number; nanoseconds?: number } | null | undefined
      ) =>
        timestamp.seconds === other?.seconds &&
        timestamp.nanoseconds === other?.nanoseconds,
      valueOf: () => `${timestamp.seconds}.${timestamp.nanoseconds}`,
    };
  }

  return timestamp;
};

/**
 * オブジェクトの中のTimestampフィールドを全て正規化する
 */
export const normalizeTimestamps = <T extends Record<string, unknown>>(
  obj: T,
  visited: WeakSet<object> = new WeakSet()
): T => {
  if (!obj || typeof obj !== 'object') return obj;

  // 循環参照を検出して無限再帰を防止
  if (visited.has(obj)) {
    return obj; // 既に処理したオブジェクトは再処理しない
  }

  // 処理中のオブジェクトを記録
  visited.add(obj);

  // 元のオブジェクトを変更しないよう、コピーを作成
  const result = { ...obj } as Record<string, unknown>;

  // Timestampフィールドを検出して変換
  Object.keys(result).forEach((key) => {
    const value = result[key];

    // nullやundefinedはスキップ
    if (value == null) return;

    // TimestampかTimestamp互換オブジェクトの場合
    if (
      typeof value === 'object' &&
      'seconds' in value &&
      'nanoseconds' in value
    ) {
      result[key] = normalizeTimestamp(value as unknown as Timestamp);
    }
    // ネストされたオブジェクトの場合は再帰的に処理
    else if (typeof value === 'object' && !Array.isArray(value)) {
      result[key] = normalizeTimestamps(
        value as Record<string, unknown>,
        visited
      );
    }
    // 配列の場合は各要素を処理
    else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        item && typeof item === 'object'
          ? normalizeTimestamps(item as Record<string, unknown>, visited)
          : item
      );
    }
  });

  return result as unknown as T;
};
