import Backend from 'i18next-fs-backend';
import { resolve } from 'node:path';
import { RemixI18Next } from 'remix-i18next/server';

import i18nextOptions from './options';

export const i18n = new RemixI18Next({
  detection: {
    supportedLanguages: i18nextOptions.supportedLngs as string[],
    fallbackLanguage: i18nextOptions.fallbackLng as string,
  },
  i18next: {
    ...i18nextOptions,
    backend: {
      loadPath: resolve(
        '../../packages/resources/i18n/locales/{{lng}}/{{ns}}.json'
      ),
    },
  },
  plugins: [Backend],
});

export default i18n;
