import { stripTags } from '../stripTags';

export const extractUrls = (content: string) => {
  if (!content) return [];

  const urls = stripTags(content).match(
    /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=;#+]*)?/g
  );

  if (!urls) return [];

  const filteredUrls: string[] = [];

  for (const url of urls) {
    if (!filteredUrls.includes(url)) filteredUrls.push(url);
  }

  return filteredUrls.sort();
};
