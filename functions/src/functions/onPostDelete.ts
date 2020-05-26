import * as functions from 'firebase-functions'
import { deletePost } from '../modules/post'

module.exports = functions.firestore.document('/posts/{postId}').onDelete(async (snapshot, context) => {
  await deletePost(snapshot, context);
})