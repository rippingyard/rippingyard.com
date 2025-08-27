import { z } from 'zod';

/**
 * Timestampの検証を行うカスタムスキーマ
 * firebase/firestoreとfirebase-admin/firestoreの両方のTimestampに対応
 */
export const TimestampSchema = z.custom<any>(
  (val) => {
    // Timestampオブジェクトの基本的な構造をチェック
    if (!val || typeof val !== 'object') return false;
    
    // Timestampの特徴的なプロパティをチェック
    // - seconds: number
    // - nanoseconds: number
    // - toDate: function
    // - toMillis: function
    return (
      ('seconds' in val && typeof val.seconds === 'number') &&
      ('nanoseconds' in val && typeof val.nanoseconds === 'number') &&
      ('toDate' in val && typeof val.toDate === 'function') &&
      ('toMillis' in val && typeof val.toMillis === 'function')
    );
  },
  {
    message: 'Invalid Timestamp object',
  }
);