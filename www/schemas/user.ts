import { Timestamp } from "firebase/firestore"

export type User = {
  uid: string
  displayName: string
  userName: string
  code?: string
  profile?: string
  avatar?: string
  role: 'load' | 'mayor' | 'resident' | 'stranger'
  isBanned: boolean;
  isDeleted: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type UserState = {
  me: User | null
}
