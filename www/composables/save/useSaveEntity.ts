import { collection, doc, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import { useMe } from '../fetch/useMe';
import { useFirebase } from '../firebase/useFirebase';
import { OriginalEntity } from 'schemas/entity';

export const defaultEntity: Omit<OriginalEntity, 'id'> = {
  name: '',
  type: 'tag',
  description: '',
  thumbnailImage: '',
  images: [],
  entities: [],
  isDeleted: false,
  counts: {
    favorite: 0,
    bookmark: 0,
    pageview: 0,
  },
  status: 'published',
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
}

const saveEntity = async (entity: Partial<OriginalEntity>): Promise<OriginalEntity> => {
  try {
    const { fb } = useFirebase();
    const db = getFirestore(fb);
    const { me } = useMe();

    // TODO: validation
    // TODO: auth処理
    if (!me.value) throw new Error('権限がありません');

    const entityCollection = collection(db, 'entities');

    const entityDoc = entity.id ? doc(entityCollection, entity.id) : doc(entityCollection);
    entity.id = entityDoc.id;

    entity.updatedAt = Timestamp.now();
    entity.createdAt = entity.createdAt || Timestamp.now();

    const newEntity: OriginalEntity = { ...defaultEntity, ...entity as OriginalEntity };

    await setDoc(entityDoc, newEntity);

    return newEntity;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const useSaveEntity = () => async (params: Partial<OriginalEntity>) => await saveEntity(params);
