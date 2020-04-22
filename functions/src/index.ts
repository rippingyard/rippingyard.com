import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const ssr = functions.https.onRequest(require('./ssr'));

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

interface Post {
  readonly title: String
  readonly content: String
  readonly status: String
}

// interface RootPost extends Post {
//   authorRef?: FirebaseFirestore.DocumentReference;
// }

export const onPostCreate = functions.firestore.document('/posts/{postId}').onCreate(async (snapshot, context) => {
  await syncPostToUser(snapshot, context);
});
export const onPostUpdate = functions.firestore.document('/posts/{postId}').onUpdate(async (change, context) => {
  await syncPostToUser(change.after, context);
});
export const onPostDelete = functions.firestore.document('/posts/{postId}').onDelete(async (snapshot, context) => {
  await deletePost(snapshot, context);
});

async function syncPostToUser(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) {
  const postId = snapshot.id;
  // const userId = context.params.userId;
  const post = snapshot.data() as Post;
  // post.authorRef = firestore.collection('users').doc(userId);

  // 共通タイムライン
  await firestore.collection('timelines').doc('public').collection('posts').doc(postId).set(post, { merge: true });

  // TODO: ユーザータイムライン
  // TODO: エンティティタイムライン
  // TODO: 全文検索登録
}

async function deletePost(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) {
  const postId = snapshot.id

  // 共通タイムライン
  await firestore.collection('timelines').doc('public').collection('posts').doc(postId).delete();

  // TODO: ユーザータイムライン
  // TODO: エンティティタイムライン
  // TODO: 全文検索から削除
}
