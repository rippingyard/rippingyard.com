// import firebase from 'firebase'
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as serverSsr from './modules/ssr'
import { syncPosts } from './modules/sync'
import { notify } from './modules/notify'
import { fetchUrl } from './controllers/fetch/url'

admin.initializeApp(functions.config().firebase)
const firestore = admin.firestore()

// SSR
export const ssr = functions.https.onRequest((request, response) => {
  serverSsr(request, response)
})

// API
export const apiFetchUrl = functions.https.onRequest((request, response) => {
  fetchUrl(request, response)
})

// onPostCreate
export const onPostCreate = functions.firestore.document('/posts/{postId}').onCreate(async (snapshot, context) => {
  await syncPosts(snapshot, context, firestore);
})

// onPostUpdate
export const onPostUpdate = functions.firestore.document('/posts/{postId}').onUpdate(async (change, context) => {
  await syncPosts(change.after, context, firestore);
})

// onActivityCreate
export const onActivityCreate = functions.firestore.document('/activities/{activityId}').onCreate(async (snapshot, context) => {
  await notify(snapshot, context, firestore);
})
