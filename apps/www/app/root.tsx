import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { json, LoaderFunctionArgs, type LinksFunction } from '@vercel/remix';
import clsx from 'clsx';
import destyle from 'destyle.css?url';

import { Env } from './components/Env';
import { Heading } from './components/Heading';
import { Layout } from './components/Layout';
import { Snackbar } from './features/snackbar';
import { useAdsenseTag } from './hooks/script/useAdsenseTag';
import { useGTM } from './hooks/script/useGTM';
import { commitSession, getMe, getSession } from './middlewares/session.server';
import { containerStyle } from './styles/container.css';
import { bodyStyle } from './styles/root.css';
import { themeClass } from './styles/theme.css';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const adsenseId = process.env.VITE_GA_ADSENSE_ID || 'ca-pub-9920890661034086';

  const env: Env = {
    VITE_GA_ADSENSE_ID: adsenseId,
    NODE_ENV: process.env.NODE_ENV,
    VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY!,
    VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN!,
    VITE_FIREBASE_DATABASE_URL: process.env.VITE_FIREBASE_DATABASE_URL!,
    VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID!,
    VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET!,
    VITE_FIREBASE_MESSAGING_SENDER_ID:
      process.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
    VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID!,
    VITE_FIREBASE_MEASUREMENT_ID: process.env.VITE_FIREBASE_MEASUREMENT_ID!,
  };

  const { uid } = await getMe(request);
  const isAuthenticated = !!uid;

  const session = await getSession(request.headers.get('Cookie'));
  const infoMessage = session.get('infoMessage');
  const alertMessage = session.get('alertMessage');

  const lang = 'ja'; //TODO: i18n対応

  return json(
    {
      isAuthenticated,
      gtagId: process.env.VITE_GTM_ID || 'GTM-5B3N3TX',
      adsenseId,
      env,
      lang,
      infoMessage,
      alertMessage,
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: destyle },
  // ...(process.env.NODE_ENV === 'development'
  //   ? [{ rel: 'stylesheet', href: rdtStylesheet }]
  //   : []),
];

export const meta: MetaFunction = () => [
  { title: 'ripping yard - 速くて小さな寄る辺なきメディア' },
  {
    name: 'description',
    content:
      '隣の庭をのぞきこめ！リッピング・ヤードは種を撒くようにあらゆる事柄を紹介していく、寄る辺なき小さなメディアです。',
  },
];

function App() {
  const {
    isAuthenticated,
    gtagId,
    adsenseId,
    lang = 'ja',
    infoMessage = '',
    alertMessage = '',
    env,
  } = useLoaderData<typeof loader>();

  useGTM(gtagId);
  useAdsenseTag(adsenseId);

  return (
    <html lang={lang} className={clsx(bodyStyle, themeClass)}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <Env env={env} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ripping yard" />
        <meta property="fb:app_id" content="374907709233344" />
        <Meta />
        <Links />
      </head>
      <body className={clsx(bodyStyle, themeClass)}>
        <Layout isAuthenticated={isAuthenticated}>
          <Outlet />
        </Layout>
        <Snackbar info={infoMessage} alert={alertMessage} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as {
    message?: string;
    data?: string;
  };
  console.error(error);

  const lang = 'ja';

  return (
    <html lang={lang} className={clsx(bodyStyle, themeClass)}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ripping yard" />
        <meta property="fb:app_id" content="374907709233344" />
        <Meta />
        <Links />
      </head>
      <body className={clsx(bodyStyle, themeClass)}>
        <Layout isAuthenticated={false}>
          <Heading>Error</Heading>
          <main className={containerStyle}>
            <h2>{error?.message || error?.data || 'Error'}</h2>
          </main>
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

export default App;
