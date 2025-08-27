import { DocumentData } from 'firebase/firestore';
import { SimpleUser } from './user';

export type NoticeLevel = 'info' | 'warn' | 'fatal';

export type Notification = {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  level: NoticeLevel;
  owner?: SimpleUser | DocumentData | null;
  message: string;
  image?: string;
  to?: string;
  activity: any;
  targets: any[];
  payload?: any;
};