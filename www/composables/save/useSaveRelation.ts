import { collection, doc, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import { useMe } from '../fetch/useMe';
import { useFirebase } from '../firebase/useFirebase';
import { OriginalRelation } from '~~/schemas/relation';

export const defaultRelation: Pick<OriginalRelation, 'as' | 'createdAt' | 'updatedAt'> = {
  as: 'relation',
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
}

const saveRelation = async (relation: Partial<OriginalRelation>): Promise<OriginalRelation> => {
  try {
    const { fb } = useFirebase();
    const db = getFirestore(fb);
    const { me } = useMe();

    // TODO: validation
    // TODO: auth処理
    if (!me.value) throw new Error('権限がありません');

    const relationCollection = collection(db, 'relations');

    const relationDoc = relation.id ? doc(relationCollection, relation.id) : doc(relationCollection);
    relation.id = relationDoc.id;

    relation.updatedAt = Timestamp.now();
    relation.createdAt = relation.createdAt || Timestamp.now();

    const newRelation: OriginalRelation = { ...defaultRelation, ...relation as OriginalRelation };

    await setDoc(relationDoc, newRelation);

    return newRelation;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const useSaveRelation = () => async (params: Partial<OriginalRelation>) => await saveRelation(params);
