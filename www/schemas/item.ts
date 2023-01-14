import { Timestamp } from '@firebase/firestore-types'

type ItemTitle = {
  [lang: string]: string,
}

type ItemType = 'item' | 'place' | 'work' | 'keyword' | 'person' | 'group' | 'event' | 'bookmark' | 'unknown'

export type OriginalItem = {
  id: string;
  name: ItemTitle | null;
  type: ItemType;
  thumbnailImage: string;
  description: string;
  path: string;
  images: string[];
  entities: string[];
  metadata?: { [key: string]: any };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  hostGroup?: null;
  isDeleted: boolean;
  counts: {
    favorite: number;
    bookmark: number;
    pageview: number;
  };
  status: 'published' | 'draft';
}

export type Item = OriginalItem;
