import { createCookieSessionStorage } from 'react-router';

import { useFirebase } from '~/hooks/firebase/useFirebase.server';

import type { Role } from '@rippingyard/schemas';

const SESSION_AGE = 60 * 60 * 24 * 14; // 二週間

type SessionData = {
  uid: string;
  token: string;
  role: Role;
  authenticatedAt: number;
};

type SessionFlashData = {
  infoMessage: string;
  alertMessage: string;
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
      secure: process.env.NODE_ENV === 'production',
      secrets: [process.env.VITE_SESSION_SECRET || 'Xpk7075rbYM6'],
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_AGE,
      httpOnly: true,
    },
  });

const getAuthToken = async (idToken: string) => {
  const admin = useFirebase();
  const adminAuth = admin.auth();
  const decodedToken = await adminAuth.verifyIdToken(idToken);

  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error('Recent sign in required');
  }
  const expiresIn = SESSION_AGE * 1000;

  return adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });
};

const getMe = async (
  request: Request
): Promise<{ uid: string | null; role: Role }> => {
  const admin = useFirebase();
  const adminAuth = admin.auth();
  const emptyValue: { uid: string | null; role: Role } = {
    uid: null,
    role: 'anonymous',
  };
  const cookieSession = await getSession(request.headers.get('Cookie'));
  const token = cookieSession.get('token');
  if (!token) return emptyValue;

  try {
    const { uid } = await adminAuth.verifySessionCookie(token, true);

    const role = cookieSession.get('role') as Role;

    return { uid, role };
  } catch (e) {
    console.error('e', e);
    return emptyValue;
  }
};

export { getSession, commitSession, destroySession, getMe, getAuthToken };
