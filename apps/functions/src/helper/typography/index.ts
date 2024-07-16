import * as sanitizeHtml from 'sanitize-html';

export const removeHtmlTags = (str: string) => {
  return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
};

export const removeTitle = (str: string) => {
  if (!str) return '';
  return str.replace(/<h.(?: .+?)?>.*?<\/h.>/, '');
};

export const getSummary = (str: string, length = 140) => {
  str = removeTitle(str);
  str = removeHtmlTags(str);
  const tail = str.length > length ? '...' : '';
  return str.substr(0, length) + tail;
};

export const getTitle = (str: string | undefined, length = 32) => {
  if (!str) return '';
  const htag = str
    .match(/<h.(?: .+?)?>.*?<\/h.>/)
    ?.map((s) => removeHtmlTags(s));
  if (htag && htag[0] !== '') return htag[0];
  return getSummary(str, length);
};

export const stripTags = (content: string, linebreak = true) => {
  if (linebreak) {
    content = content.replace(/<\/p>/g, '</p>\n\n');
    content = content.replace(/<br \/>/g, '\n\n');
    content = content.replace(/<br\/>/g, '\n\n');
    content = content.replace(/<br>/g, '\n\n');
  }

  return !content
    ? ''
    : sanitizeHtml(content, {
        allowedTags: [],
      });
};
