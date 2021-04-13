import { DocumentData } from '@firebase/firestore-types'
import { User } from './user'

export type Post = {
  id: string
  content: string
  contentOriginal: string
  createdAt: string | Date
  publishedAt: string | Date
  updatedAt: string | Date
  type: string
  owner?: User | DocumentData | null
  isPublic: boolean
  isDeleted: boolean
  status: 'published' | 'draft'
  sociallink?: string
}
