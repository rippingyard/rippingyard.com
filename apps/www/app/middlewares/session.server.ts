﻿import { createCookieSessionStorage } from '@vercel/remix';
import dayjs from 'dayjs';
import admin from 'firebase-admin';
import { initializeApp as initializeAdminApp } from 'firebase-admin/app';

const SESSION_AGE = 60 * 60 * 24 * 14; // 二週間
const TOKEN_AGE = 60 * 60 * 2; // 二時間

type SessionData = {
  uid: string;
  token: string;
  authenticatedAt: number;
};

type SessionFlashData = {
  error: string;
};

const getAdminAuth = () => {
  const cert = JSON.parse(
    process.env.VITE_GOOGLE_APPLICATION_CREDENTIALS || ''
  );
  if (!admin.apps.length) {
    initializeAdminApp({
      credential: admin.credential.cert(cert),
      databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
    });
  }
  return admin.auth();
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
  const adminAuth = getAdminAuth();
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error('Recent sign in required');
  }
  const expiresIn = SESSION_AGE * 1000;
  return adminAuth.createSessionCookie(idToken, { expiresIn });
};

const getMe = async (request: Request): Promise<{ uid: string | null }> => {
  const adminAuth = getAdminAuth();
  const now = dayjs().valueOf();
  const emptyValue = { uid: null };
  const cookieSession = await getSession(request.headers.get('Cookie'));
  const uid = cookieSession.get('uid');
  const token = cookieSession.get('token');
  const authenticatedAt = cookieSession.get('authenticatedAt') || 0;
  if (!token || !uid) return emptyValue;

  try {
    if (authenticatedAt + 1000 * TOKEN_AGE > now) return { uid };
    console.log(
      'verify token!',
      dayjs(authenticatedAt + 1000 * TOKEN_AGE).format('YYYY-MM-DD HH:mm:ss')
    );
    await adminAuth.verifySessionCookie(token, true);
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