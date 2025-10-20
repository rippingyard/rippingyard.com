import {
  onDocumentCreated,
  onDocumentUpdated,
} from 'firebase-functions/v2/firestore';
import { defineSecret } from 'firebase-functions/params';

import * as admin from 'firebase-admin';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { syncPost } from './worker/syncPost';
// import { notify } from './worker/notify';
// import { scanSecret } from './worker/scanSecret';

// Define parameters
const firestoreDatabaseId = defineSecret('FIRESTORE_DATABASE_ID');
const algoliaApiId = defineSecret('ALGOLIA_APPID');
const algoliaApiKeyAdmin = defineSecret('ALGOLIA_APIKEYADMIN');

// Initialize Firebase Admin
if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  // Emulator環境の場合
  admin.initializeApp({
    projectId: process.env.GCLOUD_PROJECT || 'rydev',
  });
} else {
  // 本番環境の場合 - デフォルトの設定を使用
  admin.initializeApp();
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
export const onPostCreate = onDocumentCreated(
  {
    document: '/posts/{postId}',
    secrets: [firestoreDatabaseId, algoliaApiId, algoliaApiKeyAdmin],
  },
  async (event) => {
    const data = event.data;
    if (!data) {
      console.log('No data');
      return;
    }

    firestore.settings({
      ignoreUndefinedProperties: true,
      databaseId: firestoreDatabaseId.value() || '(default)',
    });

    await syncPost(data, {
      event,
      firestore,
      env: {
        algoliaApiId,
        algoliaApiKeyAdmin,
      },
    });
  },
);

// onPostUpdate
export const onPostUpdate = onDocumentUpdated(
  {
    document: '/posts/{postId}',
    secrets: [algoliaApiId, algoliaApiKeyAdmin],
  },
  async (event) => {
    firestore.settings({
      ignoreUndefinedProperties: true,
      databaseId: firestoreDatabaseId.value() || '(default)',
    });

    const data = event.data;
    if (!data) {
      console.log('No data');
      return;
    }
    await syncPost(data.after, {
      event,
      firestore,
      env: {
        algoliaApiId,
        algoliaApiKeyAdmin,
      },
    });
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
