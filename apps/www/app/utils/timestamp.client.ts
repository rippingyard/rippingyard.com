/**
 * クライアントサイドでシリアライズされたFirestoreデータを復元する関数
 * タイムスタンプやドキュメント参照などのオブジェクトにメソッドを追加する
 */
export function restoreFirestoreData<T>(
  data: unknown,
  visited: WeakSet<object> = new WeakSet()
): T {
  if (data === null || data === undefined) {
    return data as T;
  }

  // 基本型はそのまま返す
  if (typeof data !== 'object') {
    return data as T;
  }

  // 循環参照検出
  if (visited.has(data as object)) {
    return data as T; // 既に処理したオブジェクトは再処理しない
  }

  // 処理中のオブジェクトを記録
  visited.add(data as object);

  // 配列の場合は各要素を処理
  if (Array.isArray(data)) {
    return data.map((item) =>
      restoreFirestoreData(item, visited)
    ) as unknown as T;
  }

  // オブジェクトの場合
  const obj = data as Record<string, unknown>;

  // シリアライズされたTimestamp型の復元
  if (obj.__type === 'timestamp' && 'seconds' in obj && 'nanoseconds' in obj) {
    const seconds = Number(obj.seconds);
    const nanoseconds = Number(obj.nanoseconds);

    return {
      __type: 'timestamp',
      seconds,
      nanoseconds,
      // タイムスタンプのメソッドを追加
      toDate: () => new Date(seconds * 1000 + nanoseconds / 1000000),
      toMillis: () => seconds * 1000 + Math.floor(nanoseconds / 1000000),
      isEqual: (other: unknown) => {
        if (!other || typeof other !== 'object') return false;
        const otherObj = other as Record<string, unknown>;
        return (
          seconds === Number(otherObj.seconds) &&
          nanoseconds === Number(otherObj.nanoseconds)
        );
      },
      toString: () => new Date(seconds * 1000).toISOString(),
      valueOf: () => `${seconds}.${nanoseconds}`,
    } as unknown as T;
  }

  // シリアライズされたDocumentReference型の復元
  if (obj.__type === 'docref' && 'path' in obj && 'id' in obj) {
    return {
      __type: 'docref',
      id: obj.id,
      path: obj.path,
      // 標準的なドキュメント参照のプロパティにアクセスできるようにする
      get parent() {
        const pathParts = String(obj.path).split('/');
        pathParts.pop(); // 最後の部分（idに相当）を削除
        return {
          id: pathParts[pathParts.length - 1],
          path: pathParts.join('/'),
        };
      },
    } as unknown as T;
  }

  // 特定のキーや特定のタイプのオブジェクトを処理から除外
  const ignoredKeys = ['global', 'window', 'document', 'console', 'process'];

  // 通常のオブジェクトの場合は再帰的に処理
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    // 特定のキーはスキップ
    if (ignoredKeys.includes(key)) {
      result[key] = value;
      continue;
    }

    // nullやundefinedはそのまま
    if (value === null || value === undefined) {
      result[key] = value;
      continue;
    }

    // オブジェクトの場合のみ再帰処理
    if (typeof value === 'object') {
      result[key] = restoreFirestoreData(value, visited);
    } else {
      result[key] = value;
    }
  }

  return result as unknown as T;
}
