import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

interface Post {
  readonly title: String
  readonly isPublic: Boolean
  readonly isDeleted: Boolean
  readonly content: String
  readonly status: String
}

export async function syncPosts(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) {

  const postId = snapshot.id
  const post = snapshot.data() as Post

  // 共通タイムライン
  // 一旦該当の記事を消す
  await firestore.collection('timelines').doc('public').collection('posts').doc(postId).delete()

  // status !== 'published'の場合は無視
  if( post.status !== 'published' || post.isDeleted ) return

  // isPublicのもの
  if( post.isPublic ) {
    await firestore.collection('timelines').doc('public').collection('posts').doc(postId).set(post, { merge: true })
  }

  // TODO: ユーザータイムライン
  // TODO: エンティティタイムライン
  // TODO: 全文検索登録
}

export async function deletePost(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) {
  const postId = snapshot.id

  // 共通タイムライン
  await firestore.collection('timelines').doc('public').collection('posts').doc(postId).delete()

  // TODO: ユーザータイムライン
  // TODO: エンティティタイムライン
  // TODO: 全文検索から削除
}
