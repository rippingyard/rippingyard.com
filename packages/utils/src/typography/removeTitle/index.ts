import { findTitleTag } from '../findTitleTag';

export const removeTitle = (str: string, level?: number) => {
  if (!str) return '';
  return str.replace(findTitleTag(level), '');
};

export const removeMainTitle = (str: string) => {
  if (!str) return '';
  return str.replace(findTitleTag(1), '');
};
