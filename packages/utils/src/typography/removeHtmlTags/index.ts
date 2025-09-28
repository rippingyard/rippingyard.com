export const removeHtmlTags = (str: string) =>
  str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
