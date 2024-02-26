import { CacheProvider } from '@emotion/react';
import { RemixBrowser } from '.pnpm/@remix-run+react@2.5.0_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist';
import * as React from '.pnpm/@types+react@18.2.47/node_modules/@types/react';
import { hydrateRoot } from 'react-dom/client';

import ClientStyleContext from '~/styles/client.context';
import createEmotionCache from '~/styles/createEmotionCache';

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = React.useState(createEmotionCache());

  const reset = React.useCallback(() => {
    setCache(createEmotionCache());
  }, []);

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrateRoot(
  document,
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>
);
