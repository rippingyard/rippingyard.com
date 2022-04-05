import { DocumentData, Timestamp } from '@firebase/firestore-types'
import { User } from '~/types/user'

export type Entity = {
  id: string
  aliases: string[]
  content: string
  contentOriginal: string
  createdAt: Timestamp
  publishedAt: Timestamp
  updatedAt: Timestamp
  owner?: User | DocumentData | null
  collaborators?: User[] | DocumentData[] | null
  isPublic: boolean
  isDeleted: boolean
}
