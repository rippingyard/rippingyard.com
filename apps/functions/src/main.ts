import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { initHttp } from './http';
import { initFetchUrl } from './api/fetchUrl';
import { syncPost } from './worker/syncPost';
import { notify } from './worker/notify';
import { scanSecret } from './worker/scanSecret';

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

/**
 * SSR
 */
export const ssr = functions.https.onRequest(initHttp());

/**
 * APIs
 */
// fetchUrl
export const apiFetchUrl = functions.https.onRequest(initFetchUrl());

/**
 * Workers
 */
// onPostCreate
export const onPostCreate = functions.firestore
  .document('/posts/{postId}')
  .onCreate(async (snapshot, context) => {
    await syncPost(snapshot, context, firestore);
  });

// onPostUpdate
export const onPostUpdate = functions.firestore
  .document('/posts/{postId}')
  .onUpdate(async (change, context) => {
    await syncPost(change.after, context, firestore);
  });

// onActivityCreate
export const onActivityCreate = functions.firestore
  .document('/activities/{activityId}')
  .onCreate(async (snapshot, context) => {
    await notify(snapshot, context, firestore);
  });

// onSecretCreate
export const onSecretCreate = functions.firestore
  .document('/secrets/{secretId}')
  .onCreate(async (snapshot, context) => {
    await scanSecret(snapshot, context, firestore);
  });
