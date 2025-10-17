import { initializeApp, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

import { type EnvType } from '~/components/Env';

export const useFirebase = () => {
  const { fb } = getFirebase();
  const env = getEnv();
  const databaseId = env?.VITE_FIRESTORE_DATABASE_ID || '(default)';
  const auth = getAuth(fb);

  // Emulator接続設定
  if (
    env?.VITE_USE_FIREBASE_EMULATOR === 'true' &&
    typeof window !== 'undefined'
  ) {
    if (!(auth as any).emulatorAlreadyInitialized) {
      connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true,
      });
      (auth as any).emulatorAlreadyInitialized = true;
    }
  }

  return { fb, auth, databaseId };
};

const getEnv = (): EnvType => {
  // Viteのimport.meta.envを使用
  return {
    NODE_ENV: import.meta.env.MODE || 'development',
    VITE_GA_ADSENSE_ID: import.meta.env.VITE_GA_ADSENSE_ID || '',
    VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || '',
    VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    VITE_FIREBASE_DATABASE_URL:
      import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
    VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    VITE_FIREBASE_STORAGE_BUCKET:
      import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    VITE_FIREBASE_MESSAGING_SENDER_ID:
      import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || '',
    VITE_FIREBASE_MEASUREMENT_ID:
      import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
    VITE_FIRESTORE_DATABASE_ID: import.meta.env.VITE_FIRESTORE_DATABASE_ID,
    VITE_USE_FIREBASE_EMULATOR:
      import.meta.env.VITE_USE_FIREBASE_EMULATOR || '',
  } as EnvType;
};

const getFirebase = () => {
  const env = getEnv();
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

  try {
    return { fb: getApp(), config };
  } catch {
    return {
      fb: initializeApp(config),
      config,
    };
  }
};
