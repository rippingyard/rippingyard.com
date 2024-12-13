import { RemixBrowser } from '@remix-run/react';
import React from 'react';

export function RemixStub({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  console.log('TETETETET');
  win.__remixManifest = {
    routes: {
      'routes/$': {
        id: 'routes/$',
        path: '*',
      },
    },
  };
  win.__remixRouteModules = {
    'routes/$': {
      default: () => children,
    },
  };
  win.__remixContext = {
    appState: {},
    matches: [],
    routeData: {},
    future: {
      v3_singleFetch: false,
    },
    state: {
      loaderData: null,
    },
  };

  return <RemixBrowser />;
}
