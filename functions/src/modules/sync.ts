import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin'

// const firestore = admin.firestore();

export async function syncPosts(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext, firestore: any) {

  const postId = snapshot.id
  const post = snapshot.data() as any

  console.log('Start!', postId, post)

  // 共通タイムライン
  // 一旦該当の記事を消す
  await firestore.collection('timelines').doc('public').collection('posts').doc(postId).delete()

  console.log('End')

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

// export async function deletePost(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) {
//   const postId = snapshot.id

//   // 共通タイムライン
//   await firestore.collection('timelines').doc('public').collection('posts').doc(postId).delete()

//   // TODO: ユーザータイムライン
//   // TODO: エンティティタイムライン
//   // TODO: 全文検索から削除
// }

