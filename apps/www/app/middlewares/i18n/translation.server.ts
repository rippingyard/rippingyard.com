import { LanguageNamespace } from '@rippingyard/resources/i18n/config';

import i18n from './i18n.server';

export const translation = async (
  request: Request,
  ns: LanguageNamespace | LanguageNamespace[] = 'common'
) => {
  const locale = await i18n.getLocale(request);
  return {
    t: await i18n.getFixedT(
      locale,
      ns as unknown as readonly [string, ...string[]]
    ),
  };
};
