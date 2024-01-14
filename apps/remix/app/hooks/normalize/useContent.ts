import { renderWidgets, sanitize } from '~/utils/typography';

export const useContent = (text: string) => {
  let content = text;

  content = sanitize(content);
  content = renderWidgets(content);

  return content;
};
