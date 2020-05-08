import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const ssr = functions.https.onRequest(require('./ssr'));

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

interface Post {
  readonly title: String
  readonly isPublic: Boolean
  readonly content: String
  readonly status: String
}

// interface RootPost extends Post {
//   authorRef?: FirebaseFirestore.DocumentReference;
// }

export const onPostCreate = functions.firestore.document('/posts/{postId}').onCreate(async (snapshot, context) => {
  await syncPosts(snapshot, context);
});
export const onPostUpdate = functions.firestore.document('/posts/{postId}').onUpdate(async (change, context) => {
  await syncPosts(change.after, context);
});
export const onPostDelete = functions.firestore.document('/posts/{postId}').onDelete(async (snapshot, context) => {
  await deletePost(snapshot, context);
});

async function syncPosts(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) {
  const postId = snapshot.id;
  // const userId = context.params.userId;
  const post = snapshot.data() as Post;
  // post.authorRef = firestore.collection('users').doc(userId);

  // 共通タイムライン
  // 一旦該当の記事を消す
  await firestore.collection('timelines').doc('public').collection('posts').doc(postId).delete()

  // status !== 'published'の場合は無視
  if( post.status !== 'published' ) return

  // isPublicのもの
  if( post.isPublic ) {
    await firestore.collection('timelines').doc('public').collection('posts').doc(postId).set(post, { merge: true })
  }

  // TODO: ユーザータイムライン
  // TODO: エンティティタイムライン
  // TODO: 全文検索登録
}

async function deletePost(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) {
  const postId = snapshot.id

  // 共通タイムライン
  await firestore.collection('timelines').doc('public').collection('posts').doc(postId).delete()

  // TODO: ユーザータイムライン
  // TODO: エンティティタイムライン
  // TODO: 全文検索から削除
}
