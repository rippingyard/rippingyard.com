import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

export const useFirebase = () => {
  const cert = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '');
  if (!admin.apps.length) {
    initializeApp({
      credential: admin.credential.cert(cert),
      databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    });
    admin.firestore().settings({
      ignoreUndefinedProperties: true,
      databaseId: process.env.VITE_FIRESTORE_DATABASE_ID || '(default)',
    });
  }
  return admin;
};
