import * as functions from 'firebase-functions'
import { syncPosts } from '../modules/post'

module.exports = functions.firestore.document('/posts/{postId}').onUpdate(async (change, context) => {
  await syncPosts(change.after, context);
})