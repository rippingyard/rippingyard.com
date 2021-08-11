import { pick } from 'lodash'
import * as dayjs from 'dayjs'
import * as functions from 'firebase-functions'
import { save as saveIndex } from '../services/search'
import { Post } from '../types/post'
import { getTitle, stripTags, removeTitle } from '../plugins/typography'
// import * as admin from 'firebase-admin'

// const firestore = admin.firestore();

export async function syncPosts(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext, firestore: any) {

  const postId = snapshot.id
  const post = snapshot.data() as Post

  console.log('functions.config()', functions.config())

  // console.log('Start!', postId, post)
  console.log('Start!', postId)

  // 共通タイムライン
  // 一旦該当の記事を消す
  await firestore.collection('timelines').doc('public').collection('posts').doc(postId).delete()

  // status !== 'published'の場合は無視
  if (post.status !== 'published' || post.isDeleted) return

  // isPublicのもの
  if (post.isPublic) {
    await firestore.collection('timelines').doc('public').collection('posts').doc(postId).set(post, { merge: true })

    // 全文検索登録
    try {
      await saveIndex('posts', {
        objectID: postId,
        title: getTitle(post.content),
        body: stripTags(removeTitle(post.content || '')),
        image: '',
        type: post.type,
        createdAt: dayjs(post.createdAt.toDate()).unix(),
        publishedAt: dayjs(post.publishedAt.toDate()).unix(),
        updatedAt: dayjs(post.updatedAt.toDate()).unix(),
        owner: post.owner?.id,
        // collaborators: [],
        // tokens: getTokens(post.content),
        entities: post.entities,
        ...pick(post, [
          'content',
          'isDeleted',
          'isPublic',
          'status',
        ]),
      })
      console.log('Index result', post.owner)
    } catch (e) {
      console.log('Error!', e)
    }
  }

  // TODO: ユーザータイムライン
  // TODO: エンティティタイムライン
}

// export async function deletePost(snapshot: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) {
//   const postId = snapshot.id

//   // 共通タイムライン
//   await firestore.collection('timelines').doc('public').collection('posts').doc(postId).delete()

//   // TODO: ユーザータイムライン
//   // TODO: エンティティタイムライン
//   // TODO: 全文検索から削除
// }

