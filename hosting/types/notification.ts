import { DocumentData } from '@firebase/firestore-types'
import { User } from '~/types/user'

export type Notification = {
  id: string
  createdAt: string | Date
  updatedAt: string | Date
  level: NoticeLevel
  owner?: User | DocumentData | null
  message: string
  image?: string
  activity: any
  targets: any[]
  payload?: any
}

export type NoticeLevel = 'info'
  | 'warn'
  | 'fatal'
