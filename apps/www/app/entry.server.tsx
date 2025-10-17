import { createReadableStreamFromReadable } from '@react-router/node';
import { createInstance } from 'i18next';
import { isbot } from 'isbot';
import { PassThrough } from 'node:stream';
import type { RenderToPipeableStreamOptions } from 'react-dom/server';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ServerRouter } from 'react-router';
import type { EntryContext } from 'react-router';

// 翻訳ファイルを直接インポート
import enCommon from '@rippingyard/resources/i18n/locales/en/common.json';
import jaCommon from '@rippingyard/resources/i18n/locales/ja/common.json';

import i18n from './middlewares/i18n/i18n.server';
import i18nextOptions from './middlewares/i18n/options';

export const streamTimeout = 8000;
export const streamTimeoutForBot = 15000; // botのタイムアウトを延長

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext
  // loadContext: AppLoadContext
  // If you have middleware enabled:
  // loadContext: unstable_RouterContextProvider
) {
  const instance = createInstance();
  const lng = await i18n.getLocale(request);
  const ns = i18n.getRouteNamespaces(routerContext);

  await instance.use(initReactI18next).init({
    ...i18nextOptions,
    lng,
    ns,
    resources: {
      ja: {
        common: jaCommon,
      },
      en: {
        common: enCommon,
      },
    },
  });

  return new Promise((resolve) => {
    let shellRendered = false;
    const userAgent = request.headers.get('user-agent');
    const isBot = userAgent && isbot(userAgent);

    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    const readyOption: keyof RenderToPipeableStreamOptions =
      isBot || routerContext.isSpaMode ? 'onAllReady' : 'onShellReady';

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <ServerRouter context={routerContext} url={request.url} />
      </I18nextProvider>,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          // botアクセス時のエラーハンドリングを改善
          console.error('Shell rendering error:', error);

          // エラー時でも静的なHTMLレスポンスを返す
          const fallbackHtml = `
            <!DOCTYPE html>
            <html lang="${lng}">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
              </head>
              <body>
                <div id="root">Loading...</div>
              </body>
            </html>
          `;

          resolve(
            new Response(fallbackHtml, {
              headers: {
                'Content-Type': 'text/html',
              },
              status: 500,
            })
          );
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error('Streaming error:', error);
          }
        },
      }
    );

    // Abort the rendering stream after the `streamTimeout` so it has time to
    // flush down the rejected boundaries
    // botの場合は長めのタイムアウトを設定
    const timeout = isBot ? streamTimeoutForBot : streamTimeout;
    setTimeout(() => {
      if (!shellRendered && isBot) {
        // botアクセスでタイムアウトした場合、エラーを避けて早めに終了
        console.warn('Bot request timed out, aborting render');
      }
      abort();
    }, timeout);
  });
}
