import { DocumentData } from 'firebase/firestore';

export type Secret = {
  id: string;
  vendor: 'fcm' | 'twitter';
  owner: DocumentData;
  payload: any;
  createdAt: any; // Timestamp
  updatedAt: any; // Timestamp
  expiredAt?: any; // Timestamp
};