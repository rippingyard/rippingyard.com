import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import type { EntryContext } from '.pnpm/@remix-run+node@2.5.0_typescript@5.3.3/node_modules/@remix-run/node/dist';
import { createReadableStreamFromReadable } from '.pnpm/@remix-run+node@2.5.0_typescript@5.3.3/node_modules/@remix-run/node/dist';
import { RemixServer } from '.pnpm/@remix-run+react@2.5.0_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist';
import isbot from '.pnpm/isbot@3.8.0/node_modules/isbot';
import { PassThrough } from 'node:stream';
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import { createSitemapGenerator } from 'remix-sitemap';

import createEmotionCache from './styles/createEmotionCache';
import ServerStyleContext from './styles/server.context';

const ABORT_DELAY = 5_000;

const { isSitemapUrl, sitemap } = createSitemapGenerator({
  siteUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3334'
      : 'https://www.rippingyard.com',
  generateRobotsTxt: true,
  // configure other things here
});

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
  // loadContext: AppLoadContext
) {
  if (isSitemapUrl(request)) return sitemap(request, remixContext);

  return isbot(request.headers.get('user-agent'))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onAllReady() {
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
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  const html = renderToString(
    <ServerStyleContext.Provider value={null}>
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  );

  const chunks = extractCriticalToChunks(html);

  const markup = renderToString(
    <ServerStyleContext.Provider value={chunks.styles}>
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  );

  responseHeaders.set('Content-Type', 'text/html');

  // let shellRendered = false;

  // const { pipe, abort } = renderToPipeableStream(
  //   <RemixServer
  //     context={remixContext}
  //     url={request.url}
  //     abortDelay={ABORT_DELAY}
  //   />,
  //   {
  //     onShellReady() {
  //       shellRendered = true;
  //       // const body = new PassThrough();
  //       // const stream = createReadableStreamFromReadable(body);

  //       const cache = createEmotionCache();
  //       const { extractCriticalToChunks } = createEmotionServer(cache);

  //       const html = renderToString(
  //         <ServerStyleContext.Provider value={null}>
  //           <CacheProvider value={cache}>
  //             <RemixServer context={remixContext} url={request.url} />
  //           </CacheProvider>
  //         </ServerStyleContext.Provider>
  //       );

  //       const chunks = extractCriticalToChunks(html);

  //       const markup = renderToString(
  //         <ServerStyleContext.Provider value={chunks.styles}>
  //           <CacheProvider value={cache}>
  //             <RemixServer context={remixContext} url={request.url} />
  //           </CacheProvider>
  //         </ServerStyleContext.Provider>
  //       );

  //       // const stream = createReadableStreamFromReadable(markup);

  //       responseHeaders.set('Content-Type', 'text/html');

  //       resolve(
  //         new Response(`<!DOCTYPE html>${markup}`, {
  //           headers: responseHeaders,
  //           status: responseStatusCode,
  //         })
  //       );

  //       pipe(body);
  //     },
  //     onShellError(error: unknown) {
  //       reject(error);
  //     },
  //     onError(error: unknown) {
  //       responseStatusCode = 500;
  //       // Log streaming rendering errors from inside the shell.  Don't log
  //       // errors encountered during initial shell rendering since they'll
  //       // reject and get logged in handleDocumentRequest.
  //       if (shellRendered) {
  //         console.error(error);
  //       }
  //     },
  //   }
  // );

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });

  // setTimeout(abort, ABORT_DELAY);
  // });
}
