import { renderWidgets, sanitize } from '~/utils/typography';

export const useContentFilter = (content: string) => {
  if (!content) return '';

  content = sanitize(content);
  content = renderWidgets(content);

  return content;
}