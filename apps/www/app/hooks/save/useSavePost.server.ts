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
  | 'entities'
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
      status,
      type,
      entities = [],
      isPublic,
      isDeleted,
      publishedAt,
    } = payload;

    const content = title
      ? `<h1>${title}</h1>${contentBody || ''}`
      : contentBody || '';

    if (!payload.uid) throw new Error('ユーザーを指定してください');
    const owner = useDocReference(payload.uid, 'users');

    const snap = await owner.get();
    if (!snap.exists) throw new Error('ユーザーが存在しません');

    const postCollection = db.collection('posts');

    const postDoc = id ? postCollection.doc(id) : postCollection.doc();

    const oldPost = (await postDoc.get()).data() as Partial<Post>;

    const post: Partial<Post> = {
      slug: '',
      status: 'drafted',
      type: 'log',
      items: [],
      isPublic: false,
      isDeleted: false,
      publishedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
      ...oldPost,
      id: postDoc.id,
      owner,
      content,
      entities,
      updatedAt: Timestamp.now(),
    };

    if (status !== undefined) post.status = status;
    if (type !== undefined) post.type = type;
    if (isPublic !== undefined) post.isPublic = isPublic;
    if (isDeleted !== undefined) post.isDeleted = isDeleted;
    if (publishedAt !== undefined) post.publishedAt = publishedAt;

    // const entities = post.entities || defaultPost.entities
    // entities.byContent = await dispatch(
    //   'entity/getEntitiesFromContent',
    //   post.content,
    //   { root: true }
    // )
    // post.entities = entities

    // TODO: slug

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
