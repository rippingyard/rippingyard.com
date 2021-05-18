import { DocumentData } from '@firebase/firestore-types'
import { User } from '~/types/user'

export type Comment = {
  id: string
  content: string
  contentOriginal: string
  createdAt: string | Date
  updatedAt: string | Date
  parent?: DocumentData | null
  parentId?: string
  owner?: User | DocumentData | null
  entities?: string[],
  isDeleted: boolean
  status: 'published' | 'draft'
}
