import { useChangeLanguage } from '~/hooks/i18n/useChangeLanguage';

import {
  supportedLanguages,
  languageNames,
} from '@rippingyard/resources/i18n/config';

export function LanguageSelector() {
  const { changeLanguage, currentLanguage } = useChangeLanguage();

  return (
    <select
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}
      aria-label="Select language"
    >
      {supportedLanguages.map((lng: string) => (
        <option key={lng} value={lng}>
          {languageNames[lng]}
        </option>
      ))}
    </select>
  );
}
