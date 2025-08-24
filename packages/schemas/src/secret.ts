import { DocumentData, Timestamp } from 'firebase-admin/firestore';

export type Secret = {
  id: string;
  vendor: 'fcm' | 'twitter';
  owner: DocumentData;
  payload: any;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expiredAt?: Timestamp;
};