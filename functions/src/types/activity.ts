import { DocumentData } from '@firebase/firestore-types'
import { User } from './user'

export type Activity = {
  id: string
  createdAt: string | Date
  updatedAt: string | Date
  type: ActivityType
  status: 'succeeded' | 'failed'
  owner?: User | DocumentData | null
  payload?: any
}

export type ActivityType = 'signup'
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
  | 'banned'
