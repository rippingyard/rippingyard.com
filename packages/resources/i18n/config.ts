export const supportedLanguages = ['ja', 'en'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

export const defaultLanguage: SupportedLanguage = 'ja';

export const languageNames: Record<string, string> = {
  ja: '日本語',
  en: 'English'
};

export const namespaces = ['common', 'post'] as const;
export type Namespace = typeof namespaces[number];

export const defaultNamespace: Namespace = 'common';