import { DocumentData, DocumentReference, collection, getDoc, getDocs, getFirestore, limit, query, where } from 'firebase/firestore';
import { QueryParams, useCachedDoc } from '../firestore/useCachedDoc';
import { OriginalPost } from '~/schemas/post';
import { RelationType } from '~~/schemas/relation';
import { useFirebase } from '~~/composables/firebase/useFirebase';
// import { useMe } from './useMe';

export type PostQueryParams = Omit<QueryParams, 'collection' | 'id'>;

export const useRelation = async (by: DocumentReference<DocumentData>, to: DocumentReference<DocumentData>, as: RelationType = 'relation') => {

  // const { me } = useMe();
  // console.log('me', me);

  const { fb } = useFirebase();

  const db = getFirestore(fb);

  let q = query(
    collection(db, 'relations')
  );

  q = query(q, where('by', '==', by));
  q = query(q, where('to', '==', to));
  q = query(q, where('as', '==', as));
  q = query(q, limit(1));

  const result = await getDocs(q);

  return !result.empty ? result.docs[0] : undefined;

};