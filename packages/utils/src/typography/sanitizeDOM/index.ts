import type { Config } from 'dompurify';
import DOMPurify from 'isomorphic-dompurify';

export const sanitizeDOM = (source: string, config: Config): string => {
  return DOMPurify.sanitize(source, config) as string;
};
