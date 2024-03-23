import { initializeApp, FirebaseApp, getApp } from 'firebase/app';

import { WindowWithEnv } from '~/components/Adsense';
import { Env } from '~/components/Env';

export const useFirebase = (): { fb: FirebaseApp } => {
  try {
    return { fb: getApp() };
  } catch (e) {
    const env = (typeof process !== 'undefined'
      ? process.env
      : (window as WindowWithEnv).env) as unknown as Env;

    const config = {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      databaseURL: env.VITE_FIREBASE_DATABASE_URL,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID,
      measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
    };

    return { fb: initializeApp(config) };
  }
};
