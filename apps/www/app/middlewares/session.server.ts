import { createCookieSessionStorage } from '@vercel/remix';
// import dayjs from 'dayjs';

import { useAdmin } from '~/hooks/firebase/useAdmin.server';

const SESSION_AGE = 60 * 60 * 24 * 14; // 二週間

type SessionData = {
  uid: string;
  token: string;
  authenticatedAt: number;
};

type SessionFlashData = {
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
  const admin = useAdmin();
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

const getMe = async (request: Request): Promise<{ uid: string | null }> => {
  const admin = useAdmin();
  const adminAuth = admin.auth();
  const emptyValue = { uid: null };
  const cookieSession = await getSession(request.headers.get('Cookie'));
  const token = cookieSession.get('token');
  if (!token) return emptyValue;

  try {
    const { uid } = await adminAuth.verifySessionCookie(token, true);

    return { uid };
  } catch (e) {
    return emptyValue;
  }
};

const isAuthenticated = async (request: Request): Promise<boolean> =>
  !!(await getMe(request)).uid;

export {
  getSession,
  commitSession,
  destroySession,
  isAuthenticated,
  getMe,
  getAuthToken,
};
