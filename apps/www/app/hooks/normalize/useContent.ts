import { useMemo } from 'react';

import {
  extractUrls,
  getSummary,
  getYoutubeThumbnail,
  sanitize,
} from '~/utils/typography';

const renderWidgets = (content: string) => {
  if (!content) return '';

  // const contentPlain = stripTags(content)
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

          // html = `[YouTube:${YouTubeId}]`;

          //     // console.log('youtubeId', urlInfo.searchParams.get('v'));
          //     html = `<span class="widget-youtube"><iframe src="https://www.youtube.com/embed/${urlInfo.searchParams.get(
          //       'v'
          //     )}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></span>`;
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

    // const d = document.createElement('div');
    // const root = createRoot(d);
    // // flushSync(() => {
    // root.render(<YouTube />);
    // // });
    // console.log('document', d);
  }

  return content;
};

const isYouTubeUrl = (url: string) => {
  const urlInfo = new URL(url);
  return ['youtube.com', 'jp.youtube.com', 'www.youtube.com'].includes(
    urlInfo.hostname
  );
};

const getYouTubeId = (url: string) => {
  if (!isYouTubeUrl(url)) return;
  const urlInfo = new URL(url);
  if (!urlInfo.searchParams.has('v')) return;
  return urlInfo.searchParams.get('v')!;
};

const getYouTubeSymbol = (id: string) => `[[YouTube:${id}]]`;

export const useContent = (text: string) => {
  // const urls = useMemo(() => extractUrls(text), [text]);

  const content = useMemo(() => {
    let c = text;

    c = sanitize(c);
    c = renderWidgets(c);
    // c = convertYouTubeWidgets(c, urls);

    return c;
  }, [text]);

  return content;
};
