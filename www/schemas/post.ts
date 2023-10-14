import { Dayjs } from 'dayjs';
import { DocumentData, Timestamp } from '@firebase/firestore-types';
import { DocumentReference } from 'firebase/firestore';
import { User } from '~/schemas/user';

export type PostStatus = 'published' | 'drafted';
export type PostType = 'article' | 'note' | 'log';

export type OriginalPost = {
  id: string;
  slug?: string;
  content: string;
  colaborators?: DocumentData[];
  createdAt: Timestamp;
  publishedAt: Timestamp;
  updatedAt: Timestamp;
  type: PostType;
  owner?: DocumentReference<DocumentData>;
  parent?: DocumentReference<DocumentData>;
  isPublic: boolean;
  isDeleted: boolean;
  entities: DocumentReference<DocumentData>[];
  counts?: {
    favorite: number;
    bookmark: number;
    pageview: number;
  }
  items?: DocumentData[];
  status: PostStatus;
}

export type Post = OriginalPost & {
  title: string
  owner?: DocumentData | User
  contentOriginal: string
  contentBody: string
  thumbnail: string
  hasThumbnail: boolean
  autoCode: number
  permalink: string
  editlink: string
  sociallink?: string
  createdDate: Dayjs
  updatedDate: Dayjs
  publishedDate: Dayjs
}
