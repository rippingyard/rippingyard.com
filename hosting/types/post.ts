import { DocumentData } from '@firebase/firestore-types'
import { User } from '~/types/user'

export type Post = {
  id: string
  slug: ''
  content: string
  contentOriginal: string
  colaborators: DocumentData[]
  createdAt: string | Date
  publishedAt: string | Date
  updatedAt: string | Date
  type: 'article' | 'note' | 'log'
  owner?: User | DocumentData | null
  parent?: DocumentData
  isPublic: boolean
  isDeleted: boolean
  entities: string[]
  counts: {
    favorite: number
    bookmark: number
    pageview: number
  }
  items: DocumentData[]
  status: 'published' | 'draft'
  sociallink?: string
}
