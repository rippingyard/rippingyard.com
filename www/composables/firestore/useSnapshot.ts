import {
  getDoc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
} from 'firebase/firestore';
import { useCacheKey } from './useCacheKey';
import { useDocReference } from './useDocReference';

export type QueryParams = {
  collection?: string;
  id?: string;
  ref?: DocumentReference;
};

export const useSnapshot = async <T>(args: QueryParams): Promise<DocumentSnapshot<DocumentData>> => {
  try {
    const { collection, id, ref } = args;
    return await getDoc<DocumentData>(ref ? useDocReference(ref.id, ref.parent.id || undefined) : useDocReference(id, collection));
  } catch (e) {
    console.error('getCachedDoc error', e);
    throw e;
  }
}
