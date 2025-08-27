// DocumentReferenceのチェックは、実行環境に依存するため
// 簡略化したチェックを使用
export const DocumentReferenceSchema = (x: any): x is any =>
  x != null && typeof x === 'object' && ('_path' in x || 'path' in x || 'id' in x);