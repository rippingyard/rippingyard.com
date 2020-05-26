import * as functions from 'firebase-functions'
import { syncPosts } from '../modules/post'

module.exports = functions.firestore.document('/posts/{postId}').onCreate(async (snapshot, context) => {
  await syncPosts(snapshot, context);
})