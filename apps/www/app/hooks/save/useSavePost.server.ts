﻿import { Timestamp } from 'firebase-admin/firestore';
import { ZodError } from 'zod';

import { Post, PostSchema } from '~/schemas/post';

import { useAdminFirestore } from '../firestore/useAdminFirestore.server';

const savePost = async (
  payload: Partial<
    Pick<
      Post,
      | 'id'
      | 'content'
      | 'status'
      | 'type'
      | 'publishedAt'
      | 'isPublic'
      | 'isDeleted'
    >
  >
) => {
  try {
    // const { fb } = useFirebase();
    // const db = getFirestore(fb);
    const db = useAdminFirestore();
    // const { me } = useMe();

    // TODO: auth処理
    // if (!me.value) throw new Error('権限がありません');

    // const entities = post.entities || defaultPost.entities
    // entities.byContent = await dispatch(
    //   'entity/getEntitiesFromContent',
    //   post.content,
    //   { root: true }
    // )
    // post.entities = entities

    const {
      content = '',
      status = 'drafted',
      type = 'log',
      isPublic = false,
      isDeleted = false,
      publishedAt = Timestamp.now(),
    } = payload;

    const post = {
      id: '',
      slug: '',
      // owner: undefined,
      content,
      status,
      type,
      entities: [],
      items: [],
      isPublic,
      isDeleted,
      publishedAt,
      createdAt: Timestamp.now(),
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
