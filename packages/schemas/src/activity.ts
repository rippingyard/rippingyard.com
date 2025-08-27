import { DocumentData } from 'firebase/firestore';
import { SimpleUser } from './user';

export type ActivityType =
  | 'signup'
  | 'post:create'
  | 'post:update'
  | 'post:delete'
  | 'comment:create'
  | 'comment:update'
  | 'comment:delete'
  | 'follow'
  | 'followed'
  | 'unfollow'
  | 'unfollowed'
  | 'block'
  | 'blocked'
  | 'banned';

export type Activity = {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  type: ActivityType;
  status: 'succeeded' | 'failed';
  owner?: SimpleUser | DocumentData | null;
  payload?: any;
};