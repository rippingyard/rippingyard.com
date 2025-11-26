import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import crypto from 'node:crypto';
import { ZodError } from 'zod';

import { type Bookmark, BookmarkSchema } from '@rippingyard/schemas';

import { useEmbedding } from '../embedding/useEmbedding.server';
import { useDocReference } from '../firestore/useDocReference.server';
import { useFirestore } from '../firestore/useFirestore.server';

type BookmarkPayload = Pick<
  Bookmark,
  | 'id'
  | 'contents'
  | 'tags'
  | 'suggestedTags'
  | 'createdAt'
  | 'isPublic'
  | 'isDeleted'
  | 'expiredAt'
>;

const saveBookmark = async (
  url: string,
  payload: Partial<
    BookmarkPayload & {
      title?: string;
      postId: string;
    }
  > = {}
) => {
  try {
    const db = useFirestore();

    const {
      postId,
      tags = [],
      suggestedTags = [],
      contents,
      isPublic,
      isDeleted,
      expiredAt,
    } = payload;

    if (!url) throw new Error('URLを指定してください');

    const bookmarkCollection = db.collection('bookmarks');
    const bookmarkDoc = bookmarkCollection.doc(convertUrlToId(url));

    const oldBookmark = (await bookmarkDoc.get()).data() as Partial<Bookmark>;

    // Embedding
    const { embedding } = useEmbedding();

    let content = '';
    if (contents?.title) content += `# ${contents.title}\n\n`;
    if (contents?.description) content += `${contents.description}`;

    const vector = await embedding(content);

    const bookmark: Partial<Bookmark> = {
      isPublic: false,
      isDeleted: false,
      createdAt: Timestamp.now(),
      ...oldBookmark,
      id: bookmarkDoc.id,
      url,
      tags,
      suggestedTags,
      contents,
      vector: FieldValue.vector(vector),
      updatedAt: Timestamp.now(),
    };

    if (isPublic !== undefined) bookmark.isPublic = isPublic;
    if (expiredAt !== undefined) bookmark.expiredAt = expiredAt;

    if (postId) {
      const postCollection = bookmarkDoc.collection('posts');
      const postDoc = postCollection.doc(postId);
      const post = await postDoc.get();
      const isExist = post.exists;
      if (!isExist) {
        await bookmarkDoc
          .collection('posts')
          .doc(postId)
          .set({
            id: postId,
            ref: useDocReference(postId, 'posts'),
            createdAt: Timestamp.now(),
          });
      }
    }

    if (isDeleted !== undefined) bookmark.isDeleted = isDeleted;

    console.log('newBookmark', bookmark);

    // Validation
    BookmarkSchema.parse(bookmark);

    await bookmarkDoc.set(bookmark);

    return { bookmark };
  } catch (e: any) {
    console.log('Error constructor name:', e?.constructor?.name);
    console.log('Error name:', e?.name);
    if (e instanceof ZodError || e?.name === 'ZodError') {
      throw e.flatten();
    }

    console.error(e);
    throw e;
  }
};

const convertUrlToId = (url: string) => crypto.hash('sha256', url);

export const useSaveBookmark = () => saveBookmark;
