import admin from 'firebase-admin';
import { getApp, getApps, initializeApp } from 'firebase-admin/app';

export const useFirebase = () => {
  const cert = JSON.parse(
    process.env.VITE_GOOGLE_APPLICATION_CREDENTIALS || ''
  );
  console.log(
    'process.env.VITE_FIREBASE_STORAGE_BUCKET',
    process.env.VITE_FIREBASE_STORAGE_BUCKET
  );
  if (!getApps().length) {
    return initializeApp({
      credential: admin.credential.cert(cert),
      databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    });
  }
  return getApp();
};
