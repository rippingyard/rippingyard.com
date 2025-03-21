﻿import DOMPurify from 'isomorphic-dompurify';

const sanitizeDOM = (source: string, config: DOMPurify.Config) => {
  return DOMPurify.sanitize(source, config) as string;
};

export const nl2br = (str: string): string => {
  if (!str) return '';
  str = sanitizeDOM(str, {
    ALLOWED_TAGS: [],
  });
  return str.replace(/\n/g, '<br/>');
};

export const removeHtmlTags = (str: string) =>
  str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');

export const removeTitle = (str: string, level?: number) => {
  if (!str) return '';
  return str.replace(titlePattern(level), '');
};

const titlePattern = (level?: number) =>
  new RegExp(
    level ? `<h${level}?>.*?</h${level}>` : '<h.(?: .+?)?>.*?</h.>',
    'g'
  );

export const removeMainTitle = (str: string) => {
  if (!str) return '';
  return str.replace(titlePattern(1), '');
};

export const hasTitle = (str: string): boolean => {
  if (!str) return false;
  return titlePattern(1).test(str);
};

export const getHeadingTags = (str: string, level?: number) => {
  return str?.match(titlePattern(level))?.map((s) => removeHtmlTags(s));
};

export const getI18nName = (
  nameObject: { [lang: string]: string },
  lang: 'en' | 'ja' = 'ja'
): string => {
  if (!nameObject) return '';
  return nameObject[lang] || '';
};

export const hasThumbnailFromText = (str: string): boolean =>
  !!getThumbnailFromText(str);

export const getThumbnailFromText = (
  str: string,
  isOwn: boolean = false
): string => {
  if (!str) return '';

  let image: string = '';

  image = extractFirstImage(str);
  if (image) return image;
  if (isOwn) return '';

  const urls = extractUrls(str);

  if (!urls) return '';

  for (const url of urls) {
    const urlInfo = new URL(url);
    // if (!urlInfo.search) continue;

    switch (urlInfo.hostname) {
      case 'youtube.com':
      case 'jp.youtube.com':
      case 'www.youtube.com':
        if (urlInfo.searchParams.has('v')) {
          // console.log('youtubeId', queries.v)
          image = getYoutubeThumbnail(urlInfo.searchParams.get('v'));
        }
        break;
    }
  }

  return image;
};

export const getYoutubeThumbnail = (v: string | null) =>
  !v ? '' : `https://i.ytimg.com/vi/${v}/hqdefault.jpg`;

// export const getSocialTitle = (str: string) => {
//   if (!str) return str
//   return decodeEntities(getTitle(str)).replace(new RegExp('&', 'g'), '%26')
// }

type TitleParams = Partial<{
  alt: string;
  titleLength: number;
  withoutSummary: boolean;
  level?: number;
}>;

export const getTitle = (str: string, options: TitleParams = {}) => {
  const { alt, titleLength = 140, withoutSummary = false, level } = options;
  const headings = getHeadingTags(str, level);
  if (headings) {
    return decodeEntities(headings[0]);
  } else {
    if (withoutSummary) return '';
    return alt ?? getSummary(str, titleLength);
  }
};

export const getMainTitle = (str: string, options: TitleParams = {}) =>
  str.match(/^<h[1-6]/)
    ? getTitle(str, { level: 1, ...options, withoutSummary: true })
    : '';

export const getSummary = (str: string, length = 140) => {
  str = removeTitle(str);
  str = removeHtmlTags(str);
  const tail = str.length > length ? '...' : '';
  return str.substring(0, length) + tail;
};

export const getTokens = (str: string) => {
  str = removeHtmlTags(str);
  return str ? str.match(/.{3}/g) : [];
};

export const getLength = (str: string) => {
  return !str ? 0 : removeHtmlTags(str).length;
};

export const stripTags = (content: string, linebreak = true) => {
  // if (!DOMPurify?.sanitize) return '';

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

export function extractFirstImage(content: string): string {
  const images = extractImages(content);
  return images.length > 0 ? images[0] : '';
}

export function extractImages(content: string) {
  const imgTags = content.match(/<img.*?src\s*=\s*["|'](.*?)["|'].*?>/gi);
  if (!imgTags) return [];
  const images: string[] = [];
  for (const i of imgTags) {
    const image = i.match(/src\s*=\s*["|'](.*?)["|']/i);
    if (image) images.push(image[1]);
  }
  return images;
}

export function extractUrls(content: string): string[] {
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
}

export const autolink = (content: string) => {
  if (!content) return '';

  content = content.replace(/"http/g, '"[http]');
  content = content.replace(/>http(.*)<\/a>/g, '>[http]$1</a>');

  const urls = extractUrls(content);
  if (!urls) return content;

  urls.reverse();

  urls.forEach((url) => {
    content = content.replace(
      url,
      `<a href="${url}" target="_blank">${getSummary(url, 44)}</a>`
    );
  });

  content = content.replace(/"\[http\]/g, '"http');
  content = content.replace(/>\[http\]/g, '>http');

  return content;
};

export const isYouTubeUrl = (url: string) => {
  const urlInfo = new URL(url);
  return ['youtube.com', 'jp.youtube.com', 'www.youtube.com'].includes(
    urlInfo.hostname
  );
};

export const getYouTubeId = (url: string) => {
  if (!isYouTubeUrl(url)) return;
  const urlInfo = new URL(url);
  if (!urlInfo.searchParams.has('v')) return;
  return urlInfo.searchParams.get('v')!;
};

export const getYouTubeSymbol = (id: string) => `[[YouTube:${id}]]`;

export function sanitize(content: string) {
  return !content
    ? ''
    : sanitizeDOM(content, {
        ALLOWED_TAGS: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p',
          'div',
          'strong',
          'b',
          'i',
          'em',
          'a',
          'img',
          'blockquote',
          'pre',
          'code',
          'mark',
          'hr',
          'ul',
          'ol',
          'li',
          'br',
        ],
        ALLOWED_ATTR: [
          'class',
          'href',
          'name',
          'target',
          'src',
          'alt',
          'title',
        ],
      });
}

export const decodeEntities = (str: string) => {
  if (!str) return str;

  const entities = [
    ['amp', '&'],
    // eslint-disable-next-line quotes
    ['apos', "'"],
    ['lt', '<'],
    ['gt', '>'],
  ];

  for (const entity of entities) {
    str = str
      .replace('&quot;', '"')
      .replace(new RegExp('&' + entity[0] + ';', 'g'), entity[1]);
  }

  return str;
};
