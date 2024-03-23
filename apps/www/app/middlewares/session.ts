import { createCookieSessionStorage } from '@remix-run/node'; // or cloudflare/deno

type SessionData = {
  uid: string;
  token: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
      secure: process.env.NODE_ENV === 'production',
      secrets: ['PGyIRdfRI5s0'],
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    },
  });

export { getSession, commitSession, destroySession };
