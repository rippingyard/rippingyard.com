import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import i18nextOptions from './options';

export async function initClientI18n() {
  await i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      ...i18nextOptions,
      detection: {
        order: ['cookie', 'localStorage', 'navigator'],
        caches: ['cookie', 'localStorage'],
      },
    });

  return i18next;
}

export default i18next;
