import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';

export function useChangeLanguage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    async (lng: string) => {
      await i18n.changeLanguage(lng);

      // Set cookie for server-side detection
      document.cookie = `lng=${lng}; path=/; max-age=31536000; SameSite=Lax`;

      // Reload the page to ensure server-side rendering with new language
      navigate(location.pathname + location.search, { replace: true });
    },
    [i18n, navigate, location]
  );

  return { changeLanguage, currentLanguage: i18n.language };
}
