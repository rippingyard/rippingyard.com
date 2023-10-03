import { Timestamp } from '@firebase/firestore-types';
import { DocumentData, DocumentReference } from 'firebase/firestore';

export type RelationType = 'relation' | 'bookmark';

export type OriginalRelation = {
  id: string;
  by: DocumentReference<DocumentData>;
  to: DocumentReference<DocumentData>;
  as: RelationType;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type Relation = OriginalRelation;
