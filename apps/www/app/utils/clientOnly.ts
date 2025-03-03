/**
 * クライアントサイドのみで実行される関数をラップするユーティリティ
 * サーバーサイドレンダリング中は何も実行せず、クライアントサイドでのみ実行されるようにします
 */

// サーバーサイドレンダリング中かどうかを判定
const isServer = typeof window === 'undefined';

/**
 * クライアントサイドでのみ実行されるモジュールをimportする
 * @param importFn モジュールをimportする関数
 * @returns インポートされたモジュールまたはダミー関数
 */
export async function clientOnly<T>(importFn: () => Promise<T>): Promise<T> {
  // サーバーサイドの場合はダミーオブジェクトを返す
  if (isServer) {
    return {} as T;
  }

  // クライアントサイドの場合は実際のモジュールをimport
  return importFn();
}

// ダミーの復元関数（サーバーサイドレンダリング用）
export function noopRestore<T>(data: T): T {
  return data;
}

export default {
  // クライアントサイドでのみ実行されるモジュールをロード
  importModule: clientOnly,
  // サーバーサイドでは何もしないダミー関数
  noopRestore,
};
