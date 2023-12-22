import { collection, doc, DocumentData, DocumentReference, getFirestore, deleteDoc, Timestamp } from 'firebase/firestore';
import { useMe } from '../fetch/useMe';
import { useFirebase } from '../firebase/useFirebase';
import { RelationType } from '~~/schemas/relation';
import { useRelations } from '~~/composables/fetch/useRelations';
import { QueryParams, WhereParams } from '~~/composables/firestore/useCachedDocs';
import { useCacheKey } from '~~/composables/firestore/useCacheKey';

const clearRelations = async (doc: DocumentReference<DocumentData>, type?: RelationType) => {
  try {
    const { fb } = useFirebase();
    const db = getFirestore(fb);
    const { me } = useMe();

    console.log('clearRelations', doc);

    // TODO: validation
    // TODO: auth処理
    if (!me.value) throw new Error('権限がありません');

    const params: Omit<QueryParams, 'collection'> = {};

    const where: WhereParams = [];
    where.push({ key: 'by', val: doc });
    if (type) where.push({ key: 'type', val: type });

    if (where.length > 0) params.where = where;

    const { pending: pendingRelations, data: relations } = await useRelations(params);

    watch(relations, () => {
      if (pendingRelations) return;
      console.log('relations', relations);
    });



    // const entities = post.entities || defaultPost.entities
    // entities.byContent = await dispatch(
    //   'entity/getEntitiesFromContent',
    //   post.content,
    //   { root: true }
    // )
    // post.entities = entities

    // TODO: slug

    // post.updatedAt = Timestamp.now();

    // post.createdAt = post.createdAt || Timestamp.now();
    // post.publishedAt = post.publishedAt || Timestamp.now();

    // const userCollection = collection(db, 'users');
    // if (!post.owner) {
    //   post.owner = await doc<DocumentData>(userCollection, me.value.uid);
    // } else if (post.owner.id) {
    //   post.owner = await doc(userCollection, post.owner.id)
    // }

    // const postCollection = collection(db, 'posts');

    // const postDoc = post.id ? doc(postCollection, post.id) : doc(postCollection);
    // post.id = postDoc.id;

    // const newPost = { ...defaultPost, ...post };
    // console.log('newPost', newPost);

    // await setDoc(postDoc, newPost);

    // // await this.saveActivity({
    // //   type: 'item:create',
    // //   status,
    // //   payload: params,
    // // })
    // return newPost;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const useClearRelations = () => async (doc: DocumentReference<DocumentData>) => await clearRelations(doc);
