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

import { Gtag } from './components/Gtag';
import { Layout } from './components/layout';
import { themeClass } from './styles/theme.css';

export const loader = async () => {
  return json({ gtagId: process.env.VITE_GTM_ID || 'GTM-5B3N3TX' });
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
  const { gtagId } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (!gtagId) return;
    console.log('pageview', location.pathname);
    gtag.pageview(location.pathname, gtagId);
  }, [location, gtagId]);

  return (
    <html lang="ja">
      <head>
        <Gtag gtagId={gtagId} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
        />
        <Meta />
        <Links />
      </head>
      <body className={themeClass}>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
