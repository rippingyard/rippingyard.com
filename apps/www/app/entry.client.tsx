import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { HydratedRouter } from 'react-router/dom';
import { getInitialNamespaces } from 'remix-i18next/client';

import i18nextOptions from './middlewares/i18n/options';

async function hydrate() {
  await i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      ...i18nextOptions,
      ns: getInitialNamespaces(),
      // HTTPバックエンドは使用しない（SSRで解決）
      detection: {
        order: ['htmlTag'],
        caches: [],
      },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
