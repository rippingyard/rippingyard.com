import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

export const useFirebase = () => {
  if (!admin.apps.length) {
    // Emulator環境の判定（環境変数またはVITE_USE_FIREBASE_EMULATORフラグで判定）
    const isEmulator =
      process.env.VITE_USE_FIREBASE_EMULATOR === 'true' ||
      process.env.FIREBASE_AUTH_EMULATOR_HOST ||
      process.env.FIRESTORE_EMULATOR_HOST;

    console.log('Firebase Admin initialization:', {
      isEmulator,
      VITE_USE_FIREBASE_EMULATOR: process.env.VITE_USE_FIREBASE_EMULATOR,
      FIREBASE_AUTH_EMULATOR_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST,
      FIRESTORE_EMULATOR_HOST: process.env.FIRESTORE_EMULATOR_HOST,
      PROJECT_ID:
        process.env.GCLOUD_PROJECT || process.env.VITE_FIREBASE_PROJECT_ID,
    });

    if (isEmulator) {
      // Emulator環境の場合
      initializeApp({
        projectId:
          process.env.GCLOUD_PROJECT ||
          process.env.VITE_FIREBASE_PROJECT_ID ||
          'rydev',
        storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
      });
    } else {
      // 本番環境の場合
      // GOOGLE_APPLICATION_CREDENTIALSが設定されていて、それがJSONの場合
      const credentialsEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;
      // JSON文字列として扱う
      const cert =
        typeof credentialsEnv === 'string' && credentialsEnv.startsWith('{')
          ? JSON.parse(credentialsEnv)
          : JSON.parse(credentialsEnv || '{}');

      initializeApp({
        credential: admin.credential.cert(cert),
        databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
        storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
      });
    }

    admin.firestore().settings({
      ignoreUndefinedProperties: true,
      databaseId: process.env.VITE_FIRESTORE_DATABASE_ID || '(default)',
    });
  }
  return admin;
};
