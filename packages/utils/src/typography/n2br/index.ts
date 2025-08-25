import { sanitizeDOM } from '../sanitizeDOM';

export const nl2br = (str: string): string => {
  if (!str) return '';
  str = sanitizeDOM(str, {
    ALLOWED_TAGS: [],
  });
  return str.replace(/\n/g, '<br/>');
};
