import { collection, doc, DocumentData, DocumentReference, DocumentSnapshot, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import { useMe } from '../fetch/useMe';
import { useFirebase } from '../firebase/useFirebase';
import { OriginalRelation, RelationType } from '~~/schemas/relation';
import { useSaveRelation } from './useSaveRelation';
import { useRelation } from '~~/composables/fetch/useRelation';

export const defaultRelation: Pick<OriginalRelation, 'as' | 'createdAt' | 'updatedAt'> = {
  as: 'relation',
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
}

const saveRelations = async (as: RelationType, by: DocumentReference<DocumentData>, targets: DocumentReference<DocumentData>[]): Promise<OriginalRelation[]> => {

  const mutateAsyncRelation = useSaveRelation();

  try {

    return await Promise.all(targets.map(async to => {
      const relation = await useRelation(by, to, 'bookmark') as unknown as OriginalRelation;
      return relation || await mutateAsyncRelation({
        by,
        to,
        as,
      });
    }));

  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const useSaveRelations = () => async (as: RelationType, by: DocumentReference<DocumentData>, targets: DocumentReference<DocumentData>[]) => await saveRelations(as, by, targets);
