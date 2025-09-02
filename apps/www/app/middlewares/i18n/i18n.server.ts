import { RemixI18Next } from 'remix-i18next/server';

// 翻訳ファイルを直接インポート
import enCommon from '@rippingyard/resources/i18n/locales/en/common.json';
import enPost from '@rippingyard/resources/i18n/locales/en/post.json';
import jaCommon from '@rippingyard/resources/i18n/locales/ja/common.json';
import jaPost from '@rippingyard/resources/i18n/locales/ja/post.json';

import i18nextOptions from './options';

export const i18n = new RemixI18Next({
  detection: {
    supportedLanguages: i18nextOptions.supportedLngs as string[],
    fallbackLanguage: i18nextOptions.fallbackLng as string,
  },
  i18next: {
    ...i18nextOptions,
    resources: {
      ja: {
        common: jaCommon,
        post: jaPost,
      },
      en: {
        common: enCommon,
        post: enPost,
      },
    },
  },
});

export default i18n;
