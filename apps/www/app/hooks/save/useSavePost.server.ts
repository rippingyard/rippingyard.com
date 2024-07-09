import { Timestamp } from 'firebase-admin/firestore';
import { ZodError } from 'zod';

import { Post, PostSchema } from '~/schemas/post';

import { useDocReference } from '../firestore/useDocReference.server';
import { useFirestore } from '../firestore/useFirestore.server';

type PostPayload = Pick<
  Post,
  | 'id'
  | 'slug'
  | 'status'
  | 'type'
  | 'createdAt'
  | 'publishedAt'
  | 'isPublic'
  | 'isDeleted'
>;

const savePost = async (
  payload: Partial<
    PostPayload & {
      title?: string;
      uid: string;
      contentBody: string;
    }
  >
) => {
  try {
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

    if (!payload.uid) throw new Error('ユーザーを指定してください');
    const owner = useDocReference(payload.uid, 'users');

    const snap = await owner.get();
    if (!snap.exists) throw new Error('ユーザーが存在しません');

    const post: Partial<Post> = {
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
      updatedAt: Timestamp.now(),
    };

    if (!id) post.createdAt = createdAt;

    // const entities = post.entities || defaultPost.entities
    // entities.byContent = await dispatch(
    //   'entity/getEntitiesFromContent',
    //   post.content,
    //   { root: true }
    // )
    // post.entities = entities

    // TODO: slug

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
    if (e instanceof ZodError) {
      const flattened = e.flatten();
      console.log('flattened', flattened);
      throw flattened;
    }

    console.error(e);
    throw e;
  }
};

export const useSavePost = () => savePost;
