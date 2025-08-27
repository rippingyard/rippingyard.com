import { OpenAIEmbeddings } from '@langchain/openai';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { ZodError } from 'zod';

import { type Post, PostSchema } from '@rippingyard/schemas';

import { useDocReference } from '../firestore/useDocReference.server';
import { useFirestore } from '../firestore/useFirestore.server';

type PostPayload = Pick<
  Post,
  | 'id'
  | 'slug'
  | 'status'
  | 'type'
  | 'tags'
  | 'suggestedTags'
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
      tags = [],
      suggestedTags = [],
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

    // Embedding
    const embeddings = new OpenAIEmbeddings({
      apiKey: import.meta.env.VITE_OPENAI_APIKEY,
    });
    // トークン制限対策：最大2000文字に制限（日本語の場合、約4000-6000トークン相当）
    const truncatedContent = contentBody.slice(0, 2000);
    const vector = await embeddings.embedQuery(truncatedContent);

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
      tags,
      suggestedTags,
      vector: FieldValue.vector(vector),
      updatedAt: Timestamp.now(),
    };

    if (status !== undefined) post.status = status;
    if (type !== undefined) post.type = type;
    if (isPublic !== undefined) post.isPublic = isPublic;
    if (isDeleted !== undefined) post.isDeleted = isDeleted;
    if (publishedAt !== undefined) post.publishedAt = publishedAt;

    if (post?.slug === null) post.slug = '';

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
  } catch (e: any) {
    console.log('Error constructor name:', e?.constructor?.name);
    console.log('Error name:', e?.name);
    if (e instanceof ZodError || e?.name === 'ZodError') {
      const flattened = e.flatten();
      throw flattened;
    }

    console.error(e);
    throw e;
  }
};

export const useSavePost = () => savePost;
