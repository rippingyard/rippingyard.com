import { User } from '~/types/user'

export type Post = {
  id: string
  content: string
  contentOriginal: string
  createdAt: string | Date
  publishedAt: string | Date
  updatedAt: string | Date
  owner?: User | null
  isDeleted: boolean
  sociallink?: string
}
