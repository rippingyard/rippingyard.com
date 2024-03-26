import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { json, type LinksFunction } from '@vercel/remix';
import destyle from 'destyle.css?url';
import { useMemo } from 'react';

import { Env } from './components/Env';
import { Layout } from './components/Layout';
import { useAdsenseTag } from './hooks/script/useAdsenseTag';
import { useGTM } from './hooks/script/useGTM';
import { bodyStyle } from './styles/root.css';
import { themeClass } from './styles/theme.css';

export const loader = async () => {
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

  return json({
    gtagId: process.env.VITE_GTM_ID || 'GTM-5B3N3TX',
    adsenseId,
    env,
  });
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
  const { gtagId, adsenseId, env } = useLoaderData<typeof loader>();

  useGTM(gtagId);
  useAdsenseTag(adsenseId);

  const className = useMemo(() => [bodyStyle, themeClass].join(' '), []);

  return (
    <html lang="ja" className={className}>
      <head>
        <Env env={env} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
          // content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ripping yard" />
        <meta property="fb:app_id" content="374907709233344" />
        <Meta />
        <Links />
      </head>
      <body className={className}>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// let AppExport = App;

// if (process.env.NODE_ENV === 'development') {
//   const { withDevTools } = await import('remix-development-tools');
//   AppExport = withDevTools(AppExport);
// }

export default App;
