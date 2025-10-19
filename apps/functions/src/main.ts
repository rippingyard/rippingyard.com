import {
  onDocumentCreated,
  onDocumentUpdated,
} from 'firebase-functions/v2/firestore';
import { config } from 'firebase-functions/v2';

import * as admin from 'firebase-admin';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

// import { syncPost } from './worker/syncPost';
// import { notify } from './worker/notify';
// import { scanSecret } from './worker/scanSecret';

// Initialize Firebase Admin
if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  // Emulator環境の場合
  admin.initializeApp({
    projectId: process.env.GCLOUD_PROJECT || 'rydev',
  });
} else {
  // 本番環境の場合
  admin.initializeApp(config().firebase);
}
const firestore = admin.firestore();

// Initialize Hono app
const app = new Hono();

// Middleware
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: (origin) => origin || '*',
    credentials: true,
  }),
);

// // Health check endpoint
// app.get('/health', (c) => {
//   return c.json({ status: 'ok', timestamp: new Date().toISOString() });
// });

// // API Routes (将来的にAPIエンドポイントを追加する場合はここに)
// app.get('/api/v1/status', (c) => {
//   return c.json({
//     service: 'rippingyard-functions',
//     version: '1.0.0',
//     environment: functions.config().runtime?.env || 'production',
//   });
// });

// // 404 handler
// app.notFound((c) => {
//   return c.json({ error: 'Not Found' }, 404);
// });

// // Error handler
// app.onError((err, c) => {
//   console.error(`${err}`);
//   return c.json({ error: 'Internal Server Error' }, 500);
// });

// /**
//  * HTTP Function - Hono app
//  */
// export const api = onRequest(async (req, res) => {
//   // Create headers object
//   const headers = new Headers();
//   Object.entries(req.headers).forEach(([key, value]) => {
//     if (typeof value === 'string') {
//       headers.set(key, value);
//     } else if (Array.isArray(value)) {
//       headers.set(key, value.join(', '));
//     }
//   });

//   // Convert Firebase request to standard Request
//   const honoReq = new Request(`https://${req.headers.host}${req.url}`, {
//     method: req.method,
//     headers,
//     body: req.body ? JSON.stringify(req.body) : undefined,
//   });

//   const response = await app.fetch(honoReq);

//   // Set response headers
//   response.headers.forEach((value: string, key: string) => {
//     res.setHeader(key, value);
//   });

//   // Set status code
//   res.status(response.status);

//   // Send response body
//   const body = await response.text();
//   res.send(body);
// });

/**
 * Firestore Triggers - Workers
 */
// onPostCreate
export const onPostCreateV2 = onDocumentCreated(
  '/posts/{postId}',
  async (event) => {
    const snapshot = event.data;
    console.log('snapshot', snapshot);
    // if (!snapshot) {
    //   console.log('No snapshot data');
    //   return;
    // }
    // await syncPost(snapshot, event, firestore);
  },
);

// onPostUpdate
export const onPostUpdateV2 = onDocumentUpdated(
  '/posts/{postId}',
  async (event) => {
    const change = event.data;
    console.log('change', change);
    // if (!change) {
    //   console.log('No change data');
    //   return;
    // }
    // await syncPost(change.after, event, firestore);
  },
);

// onActivityCreate
// export const onActivityCreate = onDocumentCreated(
//   '/activities/{activityId}',
//   async (event) => {
//     await notify(snapshot, context, firestore);
//   },
// );

// // onSecretCreate
// export const onSecretCreate = onDocumentCreated(
//   '/secrets/{secretId}',
//   async (event) => {
//     await scanSecret(snapshot, context, firestore);
//   },
// );
