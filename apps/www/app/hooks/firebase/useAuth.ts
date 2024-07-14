import { connectAuthEmulator, getAuth } from 'firebase/auth';

import { useFirebase } from './useFirebase';

export const useAuth = () => {
  const { fb } = useFirebase();

  const auth = getAuth(fb);

  if (process.env.FIREBASE_AUTH_EMULATOR_HOST)
    connectAuthEmulator(
      auth,
      `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`
    );

  return auth;
};
