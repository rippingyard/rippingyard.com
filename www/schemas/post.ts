import { Dayjs } from 'dayjs';
import { DocumentData, Timestamp } from '@firebase/firestore-types';
import { User } from '~/schemas/user';

export type OriginalPost = {
  id: string
  slug: ''
  content: string
  colaborators: DocumentData[]
  createdAt: Timestamp
  publishedAt: Timestamp
  updatedAt: Timestamp
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
}

export type Post = OriginalPost & {
  title: string
  contentOriginal: string
  contentBody: string
  thumbnail: string
  hasThumbnail: boolean
  autoCode: number
  permalink: string
  editlink: string
  sociallink?: string
  createdDate: Dayjs
  updatedDate: Dayjs
  publishedDate: Dayjs
}
