import * as functions from 'firebase-functions';
import dayjs from 'dayjs';
import { pick } from 'lodash';
import { savePostIndex } from '../../helper/saveIndex';
import { getTitle, removeTitle } from '../../helper/typography';
import { stripTags } from '@rippingyard/utils';
import type { Post } from '@rippingyard/schemas';

export const syncPost = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext,
  firestore: any,
) => {
  console.log('SyncPost', snapshot, context, firestore);
  const postId = snapshot.id;
  const post = snapshot.data() as Post;

  console.log('functions.config()', functions.config());
  console.log('Start!', postId);

  // 共通タイムライン
  // 一旦該当の記事を消す
  await firestore
    .collection('timelines')
    .doc('public')
    .collection('posts')
    .doc(postId)
    .delete();

  // status !== 'published'の場合は無視
  if (post.status !== 'published' || post.isDeleted) return;

  // isPublicのもの
  if (post.isPublic) {
    try {
      await firestore
        .collection('timelines')
        .doc('public')
        .collection('posts')
        .doc(postId)
        .set(post, { merge: true });

      // 全文検索登録
      console.log('start saving to index');
      await savePostIndex({
        objectID: postId,
        title: getTitle(post.content),
        body: stripTags(removeTitle(post.content || '')),
        image: '',
        type: post.type,
        createdAt: dayjs(post.createdAt.toDate()).unix(),
        publishedAt: dayjs(post.publishedAt.toDate()).unix(),
        updatedAt: dayjs(post.updatedAt.toDate()).unix(),
        owner: post.owner?.id,
        tags: post.tags || [],
        ...pick(post, ['content', 'isDeleted', 'isPublic', 'status']),
      });
      console.log('Index result', post.owner);
    } catch (e) {
      console.log('Error!', e);
    }
  }
};
