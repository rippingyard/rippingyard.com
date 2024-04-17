import { Timestamp } from 'firebase-admin/firestore';
import { ZodError } from 'zod';

import { Post, PostSchema } from '~/schemas/post';

import { useDocReference } from '../firestore/useDocReference.server';
import { useFirestore } from '../firestore/useFirestore.server';

const savePost = async (
  payload: Partial<
    Pick<
      Post,
      | 'id'
      | 'status'
      | 'type'
      | 'createdAt'
      | 'publishedAt'
      | 'isPublic'
      | 'isDeleted'
    > & {
      title?: string;
      uid: string;
      contentBody: string;
    }
  >
) => {
  try {
    // const { fb } = useFirebase();
    const db = useFirestore();

    const {
      id,
      title = '',
      contentBody = '',
      status = 'drafted',
      type = 'log',
      isPublic = false,
      isDeleted = false,
      createdAt = Timestamp.now(),
      publishedAt = Timestamp.now(),
    } = payload;

    const content = title
      ? `<h1>${title}</h1>${contentBody || ''}`
      : contentBody || '';

    const owner = useDocReference(payload.uid, 'users');
    console.log('owner', owner);

    if (!owner) throw new Error('ユーザーが存在しません');

    // TODO: auth処理
    // if (!me.value) throw new Error('権限がありません');

    // const entities = post.entities || defaultPost.entities
    // entities.byContent = await dispatch(
    //   'entity/getEntitiesFromContent',
    //   post.content,
    //   { root: true }
    // )
    // post.entities = entities

    const post = {
      id,
      slug: '',
      owner,
      content,
      status,
      type,
      entities: [],
      items: [],
      isPublic,
      isDeleted,
      publishedAt,
      createdAt,
      updatedAt: Timestamp.now(),
    };

    // TODO: slug

    // const userCollection = collection(db, 'users');
    // if (!post.owner) {
    //   post.owner = await doc<DocumentData>(userCollection, me.value.uid);
    // } else if (post.owner.id) {
    //   post.owner = await doc(userCollection, post.owner.id);
    // }

    const postCollection = db.collection('posts');

    const postDoc = post.id
      ? postCollection.doc(post.id)
      : postCollection.doc();
    post.id = postDoc.id;

    console.log('newPost', post);

    // Validation
    PostSchema.parse(post);

    await postDoc.set(post);

    // await this.saveActivity({
    //   type: 'item:create',
    //   status,
    //   payload: params,
    // })
    return { post };
  } catch (e) {
    console.error(e);

    if (e instanceof ZodError) {
      throw e.flatten();
    }

    throw e;
  }
};

export const useSavePost = () => savePost;
