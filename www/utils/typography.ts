import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import { OriginalItem } from '~/schemas/item';
import { OriginalPost, Post } from '~/schemas/post';

export const nl2br = (str: string): string => {
  if (!str) return '';
  str = DOMPurify.sanitize(str, {
    ALLOWED_TAGS: [],
  });
  return str.replace(/\n/g, '<br/>');
}

export const removeHtmlTags = (str: string) => {
  return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
}

export const removeTitle = (str: string) => {
  if (!str) return '';
  return str.replace(/<h.(?: .+?)?>.*?<\/h.>/g, '');
}

export const hasTitle = (str: string): boolean => {
  if (!str) return false
  return /<h.(?: .+?)?>.*?<\/h.>/.test(str)
}

export const getTitle = (str: string | Post | OriginalPost, parent?: OriginalItem, length: number = 32, alt?: string) => {
  if (!str) return ''
  if (typeof str === 'string') {
    const htags = getHtags(str)
    if (htags && htags[0] !== '') return decodeEntities(htags[0])
    return alt || getSummary(str, length)
  } else {
    const htags = getHtags(str.content)
    if (htags && htags[0] !== '') return decodeEntities(htags[0])
    if (parent && parent?.name?.ja) return parent.name.ja;
    return alt || dayjs(str.publishedAt.toDate()).format('YYYY/M/D');
  }
}

export const getHtags = (str: string) => {
  return str?.match(/<h.(?: .+?)?>.*?<\/h.>/)?.map(s => removeHtmlTags(s))
}

export const getI18nName = (nameObject: { [lang: string]: string }, lang: 'en' | 'ja' = 'ja'): string => {
  if (!nameObject) return ''
  return nameObject[lang] || ''
}

export const hasThumbnailFromText = (str: string): boolean => {
  return !!getThumbnailFromText(str)
}

export const getThumbnailFromText = (str: string, isOwn: boolean = false): string => {
  if (!str) return '';

  let image: string = '';

  image = extractFirstImage(str);
  if (image) return image;
  if (isOwn) return '';

  const urls = extractUrls(str);

  if (!urls) return ''

  for (const url of urls) {
    const urlInfo = new URL(url);
    // if (!urlInfo.search) continue;

    switch (urlInfo.hostname) {
      case 'youtube.com':
      case 'jp.youtube.com':
      case 'www.youtube.com':
        if (urlInfo.searchParams.has('v')) {
          // console.log('youtubeId', queries.v)
          image = `https://i.ytimg.com/vi/${urlInfo.searchParams.get('v')}/hqdefault.jpg`
        }
        break
    }
  }

  return image
}

// export const getSocialTitle = (str: string) => {
//   if (!str) return str
//   return decodeEntities(getTitle(str)).replace(new RegExp('&', 'g'), '%26')
// }

export const getSummary = (str: string, length = 140) => {
  str = removeTitle(str);
  str = removeHtmlTags(str);
  const tail = str.length > length ? '...' : '';
  return str.substring(0, length) + tail;
}

export const getTokens = (str: string) => {
  str = removeHtmlTags(str);
  return str ? str.match(/.{3}/g) : [];
}

export const getLength = (str: string) => {
  return !str ? 0 : removeHtmlTags(str).length;
}

export const stripTags = (content: string, linebreak = true) => {
  if (!DOMPurify?.sanitize) return '';

  if (linebreak) {
    content = content.replace(/<\/p>/g, '</p>\n\n');
    content = content.replace(/<br \/>/g, '\n\n');
    content = content.replace(/<br\/>/g, '\n\n');
    content = content.replace(/<br>/g, '\n\n');
  }

  if (!DOMPurify?.sanitize) return content;

  return !content
    ? ''
    : DOMPurify?.sanitize(content, {
      ALLOWED_TAGS: [],
    });
}

export function extractFirstImage(content: string): string {
  const images = extractImages(content);
  return images.length > 0 ? images[0] : '';
}

export function extractImages(content: string) {
  const imgTags = content.match(/<img.*?src\s*=\s*["|'](.*?)["|'].*?>/gi)
  if (!imgTags) return []
  const images: string[] = []
  for (const i of imgTags) {
    const image = i.match(/src\s*=\s*["|'](.*?)["|']/i)
    if (image) images.push(image[1]);
  };
  return images
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

  return filteredUrls.sort()
}

export const renderWidgets = (content: string) => {
  if (!content) return ''

  // const contentPlain = stripTags(content)
  const urls = extractUrls(content)
  if (!urls) return content

  content = content.replace(/"http/g, '"[http]')

  urls.reverse()

  let urlInfo: URL;
  let html = ''

  urls.forEach(url => {
    html = url;
    urlInfo = new URL(url);
    console.log('parsed url', urlInfo);

    switch (urlInfo.hostname) {
      case 'youtube.com':
      case 'jp.youtube.com':
      case 'www.youtube.com':
        if (urlInfo.searchParams.has('v')) {
          console.log('youtubeId', urlInfo.searchParams.get('v'));
          html = `<span class="widget-youtube"><iframe src="https://www.youtube.com/embed/${urlInfo.searchParams.get('v')}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></span>`
        }
        break

      default:
        html = `<a href="${url}" target="_blank">${getSummary(url, 44)}</a>`
        break
    }

    content = content.replace(url, html)
  })

  content = content.replace(/"\[http\]/g, '"http')

  return content
}

export function sanitize(content: string) {
  return !content
    ? ''
    : DOMPurify.sanitize(content, {
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
        'title'
      ],
    })
}

export const decodeEntities = (str: string) => {
  if (!str) return str

  const entities = [
    ['amp', '&'],
    ['apos', "'"],
    ['lt', '<'],
    ['gt', '>'],
  ]

  for (const entity of entities) {
    str = str
      .replace('&quot;', '"')
      .replace(new RegExp('&' + entity[0] + ';', 'g'), entity[1])
  };

  return str
}
