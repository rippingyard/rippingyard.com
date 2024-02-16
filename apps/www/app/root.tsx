import { cssBundleHref } from '@remix-run/css-bundle';
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import { json, type LinksFunction } from '@vercel/remix';
import destyle from 'destyle.css';
import { useEffect } from 'react';

import * as gtag from '~/middlewares/gtag.client';

import './styles/root.css';

import { Adsense } from './components/Adsense';
import { AdsenseTag } from './components/AdsenseTag';
import { Env } from './components/Env';
import { Gtag } from './components/Gtag';
import { Layout } from './components/Layout';
import { themeClass } from './styles/theme.css';

export const loader = async () => {
  const adsenseId = process.env.VITE_GA_ADSENSE_ID || 'ca-pub-9920890661034086';

  const env: Env = {
    VITE_GA_ADSENSE_ID: adsenseId,
    NODE_ENV: process.env.NODE_ENV,
  };

  return json({
    gtagId: process.env.VITE_GTM_ID || 'GTM-5B3N3TX',
    adsenseId,
    env,
  });
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: destyle },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => [
  { title: 'ripping yard - 速くて小さな寄る辺なきメディア' },
];

export default function App() {
  const location = useLocation();
  const { gtagId, adsenseId, env } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (!gtagId) return;
    console.log('pageview', location.pathname);
    gtag.pageview(location.pathname, gtagId);
  }, [location, gtagId]);

  return (
    <html lang="ja">
      <head>
        <Env env={env} />
        <Gtag gtagId={gtagId} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
        />
        <Meta />
        <Links />
        <AdsenseTag adsenseId={adsenseId} />
      </head>
      <body className={themeClass}>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Adsense slot="4746787312" />
      </body>
    </html>
  );
}
