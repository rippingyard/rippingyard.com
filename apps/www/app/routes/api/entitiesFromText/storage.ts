// 一時的にコンテンツを保持するためのストレージモジュール
// 実運用の場合は、Redis/Memcached/DBなどの外部ストレージを使うべきです

export interface ContentEntry {
  content: string;
  timestamp: number;
}

// メモリ内ストレージ
export const tempContentStorage: Record<string, ContentEntry> = {};

// 古いエントリーをクリーンアップする関数 (1時間経過したら削除)
export const cleanupOldEntries = () => {
  const currentTime = Date.now();
  const expirationTime = 60 * 60 * 1000; // 1時間

  Object.keys(tempContentStorage).forEach((key) => {
    if (currentTime - tempContentStorage[key].timestamp > expirationTime) {
      delete tempContentStorage[key];
    }
  });
};

// クリーンアップを定期的に実行するための初期化関数
// サーバーインスタンスごとに1回だけ呼び出す
let cleanupInitialized = false;
export const initCleanupInterval = () => {
  if (!cleanupInitialized) {
    // 10分ごとにクリーンアップを実行
    setInterval(cleanupOldEntries, 10 * 60 * 1000);
    cleanupInitialized = true;
  }
};
