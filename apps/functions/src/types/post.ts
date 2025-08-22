import { DocumentData, Timestamp } from '@firebase/firestore-types';
import { User } from './user';

export type Post = {
  id: string;
  content: string;
  contentOriginal: string;
  createdAt: Timestamp;
  publishedAt: Timestamp;
  updatedAt: Timestamp;
  type: string;
  owner?: User | DocumentData | null;
  isPublic: boolean;
  isDeleted: boolean;
  tags: string[];
  items: DocumentData[];
  status: 'published' | 'draft';
  sociallink?: string;
};
