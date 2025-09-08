import { FC, memo } from 'react';

export type EnvType = {
  NODE_ENV: string;
  VITE_GA_ADSENSE_ID: string;
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_AUTH_DOMAIN: string;
  VITE_FIREBASE_DATABASE_URL: string;
  VITE_FIREBASE_PROJECT_ID: string;
  VITE_FIREBASE_STORAGE_BUCKET: string;
  VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  VITE_FIREBASE_APP_ID: string;
  VITE_FIREBASE_MEASUREMENT_ID: string;
  VITE_FIRESTORE_DATABASE_ID?: string;
};

const EnvComponent: FC<{
  env: EnvType;
}> = ({ env }) => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.env = ${JSON.stringify(env)}`,
      }}
    />
  );
};

export const Env = memo(EnvComponent);
