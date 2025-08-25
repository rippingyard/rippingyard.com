import { useMemo } from 'react';

import {
  extractUrls,
  getSummary,
  getYouTubeId,
  getYouTubeSymbol,
  getYoutubeThumbnail,
  isYouTubeUrl,
  sanitize,
} from '~/utils/typography';

const renderWidgets = (content: string) => {
  if (!content) return '';

  const urls = extractUrls(content);
  if (!urls) return content;

  content = content.replace(/"http/g, '"[http]');

  urls.reverse();

  let urlInfo: URL;
  let html = '';

  urls.forEach((url) => {
    html = url;
    urlInfo = new URL(url);
    console.log('parsed url', urlInfo);

    switch (urlInfo.hostname) {
      case 'youtube.com':
      case 'jp.youtube.com':
      case 'www.youtube.com':
        if (urlInfo.searchParams.has('v')) {
          const YouTubeId = urlInfo.searchParams.get('v');
          if (!YouTubeId) break;

          html = getYouTubeSymbol(YouTubeId);
        }

        break;

      default:
        html = `<a href="${url}" target="_blank">${getSummary(url, 44)}</a>`;
        break;
    }

    content = content.replace(url, html);
  });

  return content.replace(/"\[http\]/g, '"http');
};

export const convertYouTubeWidgets = (text: string, urls: string[] = []) => {
  let content = text;

  const youtubeIds = urls
    .filter((url) => isYouTubeUrl(url))
    .map((url) => getYouTubeId(url)!);

  for (const youtubeId of youtubeIds) {
    console.log('youtubeId', youtubeId);

    const symbol = getYouTubeSymbol(youtubeId);
    const image = getYoutubeThumbnail(youtubeId);

    content = content.replace(
      new RegExp(symbol),
      `<img src="${image}" class="youtube-image" />`
    );
  }

  return content;
};

export const useContent = (text: string) => {
  // const urls = useMemo(() => extractUrls(text), [text]);

  const content = useMemo(() => {
    let c = text;

    c = sanitize(c);
    c = renderWidgets(c);

    return c;
  }, [text]);

  return content;
};
