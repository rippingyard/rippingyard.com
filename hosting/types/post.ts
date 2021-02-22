import { DocumentData } from '@firebase/firestore-types'
import { User } from '~/types/user'

export type Post = {
  id: string
  content: string
  contentOriginal: string
  createdAt: string | Date
  publishedAt: string | Date
  updatedAt: string | Date
  type: string
  owner?: User | DocumentData | null
  isDeleted: boolean
  sociallink?: string
}
