// DocumentDataは単純なオブジェクトとして扱う
type DocumentData = Record<string, any>;

export type Secret = {
  id: string;
  vendor: 'fcm' | 'twitter';
  owner: DocumentData;
  payload: any;
  createdAt: any; // Timestamp
  updatedAt: any; // Timestamp
  expiredAt?: any; // Timestamp
};