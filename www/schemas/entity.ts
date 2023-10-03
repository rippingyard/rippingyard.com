import { Timestamp } from '@firebase/firestore-types'

type EntityBody = {
  name: string;
};

export type EntityType = 'genre' | 'bookmark' | 'tag';
// type EntityType = 'item' | 'place' | 'work' | 'keyword' | 'person' | 'group' | 'event' | 'bookmark' | 'unknown';

export type OriginalEntity = {
  id: string;
  name: string;
  type: EntityType;
  description: string;
  thumbnailImage: string;
  images: string[];
  entities: string[];
  metadata?: { [key: string]: any };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // hostGroup?: null;
  isDeleted: boolean;
  translated?: {
    [lang: string]: EntityBody;
  };
  counts: {
    favorite: number;
    bookmark: number;
    pageview: number;
  };
  status: 'published' | 'draft';
}

export type Entity = OriginalEntity;
