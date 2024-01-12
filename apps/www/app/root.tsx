import { css } from '@emotion/react';
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@vercel/remix';
import destyle from 'destyle.css';

import { Layout } from './components/layout';
import { FONT, black, white } from './utils/style';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: destyle },
];

export const meta: MetaFunction = () => [
  { title: 'ripping yard - 速くて小さな寄る辺なきメディア' },
];

export default function App() {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
        />
        <Meta />
        <Links />
      </head>
      <body css={bodyStyle}>
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

const bodyStyle = css({
  margin: 0,
  padding: 0,
  fontFamily: FONT.NORMAL,
  fontSize: 18,
  lineHeight: 1.8,
  backgroundColor: white(),
  color: black(),
});
