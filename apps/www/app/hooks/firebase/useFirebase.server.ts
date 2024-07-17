﻿import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

export const useFirebase = () => {
  const cert = JSON.parse(
    process.env.VITE_GOOGLE_APPLICATION_CREDENTIALS || ''
  );
  console.log('cert', cert);
  console.log('process.env.FIREBASE_CONFIG', process.env.FIREBASE_CONFIG);
  if (!admin.apps.length) {
    initializeApp({
      credential: admin.credential.cert(cert),
      databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    });
  }
  return admin;
};
