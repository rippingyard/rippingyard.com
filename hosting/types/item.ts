type ItemTitle = {
  [lang: string]: string,
}

export type Item = {
  id: string
  name: ItemTitle | null
  type: 'item' | 'place' | 'work' | 'person' | 'bookmark' | 'unknown'
  thumbnailImage: string
  images: string[]
  entities: string[]
  createdAt: string | Date
  updatedAt: string | Date
  hostGroup?: null
  isDeleted: boolean
  counts: {
    favorite: number,
    bookmark: number,
    pageview: number,
  }
  status: 'published' | 'draft'
}
