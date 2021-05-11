import { DocumentData } from '@firebase/firestore-types'
import { User } from '~/types/user'

export type Entity = {
  id: string
  aliases: string[]
  content: string
  contentOriginal: string
  createdAt: string | Date
  publishedAt: string | Date
  updatedAt: string | Date
  owner?: User | DocumentData | null
  collaborators?: User[] | DocumentData[] | null
  isPublic: boolean
  isDeleted: boolean
}
