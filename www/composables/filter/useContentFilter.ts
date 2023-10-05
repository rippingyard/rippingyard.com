import { renderWidgets, sanitize } from '~~/utils/typography';

export const useContentFilter = (content: string) => {

  const filteredContent = ref('');

  if (!content) return filteredContent;

  content = sanitize(content);
  content = renderWidgets(content);

  filteredContent.value = content;

  return filteredContent;
}