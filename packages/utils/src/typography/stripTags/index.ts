import { sanitizeDOM } from '../sanitizeDOM';

export const stripTags = (content: string, linebreak = true) => {
  if (linebreak) {
    content = content.replace(/<\/p>/g, '</p>\n\n');
    content = content.replace(/<br \/>/g, '\n\n');
    content = content.replace(/<br\/>/g, '\n\n');
    content = content.replace(/<br>/g, '\n\n');
  }

  return !content
    ? ''
    : sanitizeDOM(content, {
        ALLOWED_TAGS: [],
      });
};
