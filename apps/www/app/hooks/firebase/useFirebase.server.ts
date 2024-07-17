import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

export const useFirebase = () => {
  const cert = JSON.parse(
    process.env.VITE_GOOGLE_APPLICATION_CREDENTIALS || ''
  );
  console.log('cert', cert);
  // if (!admin.apps.length) {
  console.log(
    'initialize! VITE_FIREBASE_STORAGE_BUCKET',
    process.env.VITE_FIREBASE_STORAGE_BUCKET
  );
  initializeApp({
    credential: admin.credential.cert(cert),
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  });
  // } else {
  //   console.log('no initialize');
  // }
  return admin;
};
