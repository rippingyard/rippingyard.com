import type { InitOptions } from 'i18next';

import {
  supportedLanguages,
  defaultLanguage,
  namespaces,
  defaultNamespace,
} from '@rippingyard/resources/i18n/config';

const i18nextOptions: InitOptions = {
  supportedLngs: supportedLanguages as unknown as string[],
  fallbackLng: defaultLanguage,
  defaultNS: defaultNamespace,
  ns: namespaces as unknown as string[],
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
};

export default i18nextOptions;
