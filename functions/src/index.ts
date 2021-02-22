import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { syncPosts } from './modules/sync'

// const firestore = functions.region("asia-northeast-1").firestore

admin.initializeApp(functions.config().firebase)
const firestore = admin.firestore()
console.log('firestore', firestore)

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!?", {structuredData: true})
  response.send("Hello from Firebase!!!!?")
})

export const onPostCreate = functions.firestore.document('/posts/{postId}').onCreate(async (snapshot, context) => {
  await syncPosts(snapshot, context, firestore);
})

export const onPostUpdate = functions.firestore.document('/posts/{postId}').onUpdate(async (change, context) => {
  await syncPosts(change.after, context, firestore);
})

// export const onPostDelete = functions.firestore.document('/posts/{postId}').onDelete(async (snapshot, context) => {
//   await deletePost(snapshot, context);
// })
