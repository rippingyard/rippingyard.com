import clsx from 'clsx';
import destyle from 'destyle.css?url';
import { useTranslation } from 'react-i18next';
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  data,
  LoaderFunctionArgs,
  type LinksFunction,
} from 'react-router';
import { useChangeLanguage } from 'remix-i18next/react';

import enCommon from '@rippingyard/resources/i18n/locales/en/common.json';
import jaCommon from '@rippingyard/resources/i18n/locales/ja/common.json';

import { Route } from './+types/root';
import { Env, type EnvType } from './components/Env';
import { Layout } from './components/Layout';
import { ErrorComponent } from './features/error';
import { Snackbar } from './features/snackbar';
import { useAdsenseTag } from './hooks/script/useAdsenseTag';
import { useGTM } from './hooks/script/useGTM';
import i18n from './middlewares/i18n/i18n.server';
import { commitSession, getMe, getSession } from './middlewares/session.server';
import { bodyStyle } from './styles/root.css';
import { themeClass } from './styles/theme.css';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const locale = await i18n.getLocale(request);

  // 翻訳リソースを直接取得（awaitを避ける）
  const translations =
    locale === 'en'
      ? {
          common: enCommon,
        }
      : {
          common: jaCommon,
        };

  const adsenseId = process.env.VITE_GA_ADSENSE_ID || 'ca-pub-9920890661034086';

  // クライアントに公開しても安全な環境変数のみを含める
  // Firebase クライアントSDKの設定は公開可能（APIキーは使用制限で保護）
  const env: EnvType = {
    VITE_GA_ADSENSE_ID: adsenseId,
    NODE_ENV: process.env.NODE_ENV!,
    VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY!,
    VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN!,
    VITE_FIREBASE_DATABASE_URL: process.env.VITE_FIREBASE_DATABASE_URL!,
    VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID!,
    VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET!,
    VITE_FIREBASE_MESSAGING_SENDER_ID:
      process.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
    VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID!,
    VITE_FIREBASE_MEASUREMENT_ID: process.env.VITE_FIREBASE_MEASUREMENT_ID!,
    // 以下の環境変数は絶対にクライアントに公開してはいけない
    // GOOGLE_APPLICATION_CREDENTIALS - Firebase Admin SDK秘密鍵
    // OPENAI_APIKEY - OpenAI APIキー
    // ANTHROPIC_API_KEY - Anthropic APIキー
    // ALGOLIA_APIKEY_ADMIN - Algolia管理者キー
    // SESSION_SECRET - セッションシークレット
  };

  const { uid } = await getMe(request);
  const isAuthenticated = !!uid;

  const currentUrl = request.url;
  const uriObject = new URL(currentUrl);
  const pathname = uriObject.pathname || '';

  const isWriting = /^\/post\/create|^\/post\/(.*)\/edit|^\/home\/profile/.test(
    pathname
  );

  const session = await getSession(request.headers.get('Cookie'));
  const infoMessage = session.get('infoMessage');
  const alertMessage = session.get('alertMessage');

  // Authが切れてしまった場合、tokenをクリアする
  if (!isAuthenticated) session.unset('token');

  return data(
    {
      isAuthenticated,
      isWriting,
      gtagId: process.env.VITE_GTM_ID || 'GTM-5B3N3TX',
      adsenseId,
      env,
      locale,
      translations,
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
    isWriting,
    gtagId,
    adsenseId,
    locale = 'ja',
    translations,
    infoMessage = '',
    alertMessage = '',
    env,
  } = useLoaderData<typeof loader>();

  const { i18n } = useTranslation();
  useChangeLanguage(locale);

  // SSRで取得した翻訳をi18nに追加
  if (
    translations &&
    typeof window !== 'undefined' &&
    !window.__i18nInitialized
  ) {
    Object.entries(translations).forEach(([ns, resources]) => {
      i18n.addResourceBundle(locale, ns, resources, true, true);
    });
    window.__i18nInitialized = true;
  }

  useGTM(gtagId);
  useAdsenseTag(adsenseId);

  return (
    <html
      lang={locale}
      className={clsx(bodyStyle, themeClass)}
      dir={i18n.dir()}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <Env env={env} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald&family=Ultra&display=swap"
          rel="stylesheet"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ripping yard" />
        <meta property="fb:app_id" content="374907709233344" />
        <Meta />
        <Links />
      </head>
      <body className={clsx(bodyStyle, themeClass)} suppressHydrationWarning>
        <Layout isAuthenticated={isAuthenticated} isWriting={isWriting}>
          <Outlet />
        </Layout>
        <Snackbar info={infoMessage} alert={alertMessage} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const locale = 'ja';

  return (
    <html lang={locale} className={clsx(bodyStyle, themeClass)}>
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
          <ErrorComponent error={error as Error} />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

export default App;
