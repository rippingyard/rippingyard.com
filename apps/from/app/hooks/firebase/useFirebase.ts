import { initializeApp, FirebaseApp, getApp } from 'firebase/app';

export const useFirebase = (): { fb: FirebaseApp } => {
  try {
    return { fb: getApp() };
  } catch (e) {
    const config = {
      apiKey: process.env.VITE_FIREBASE_API_KEY,
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    };

    return { fb: initializeApp(config) };
  }
};
