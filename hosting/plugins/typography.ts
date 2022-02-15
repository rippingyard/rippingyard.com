import _ from 'lodash'
import urlParse from 'url-parse'
import queryString from 'query-string'
import sanitizeHtml from 'sanitize-html'
import { Post } from '~/types/post'

export const nl2br = (str: string): string => {
  if (!str) return '';
  str = sanitizeHtml(str, {
    allowedTags: [],
  });
  return str.replace(/\n/g, '<br/>');
}

export const removeHtmlTags = (str: string) => {
  return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
}

export const removeTitle = (str: string) => {
  if (!str) return ''
  return str.replace(/<h.(?: .+?)?>.*?<\/h.>/, '')
}

export const hasTitle = (str: string): boolean => {
  if (!str) return false
  return /<h.(?: .+?)?>.*?<\/h.>/.test(str)
}

export const getTitle = (str: string | Post, length: number = 32, alt?: string) => {
  if (!str) return ''
  if (typeof str === 'string') {
    const htags = getHtags(str)
    if (htags && htags[0] !== '') return decodeEntities(htags[0])
    return alt || getSummary(str, length)
  } else {
    const htags = getHtags(str.content)
    if (htags && htags[0] !== '') return decodeEntities(htags[0])
    if (str.parent) {
      if (str.parent.name.ja) return str.parent.name.ja
    }
    return alt || getSummary(str.content, length)
  }
}

export const getHtags = (str: string) => {
  return str.match(/<h.(?: .+?)?>.*?<\/h.>/)?.map(s => removeHtmlTags(s))
}

export const getI18nName = (nameObject: { [lang: string]: string }, lang: 'en' | 'ja' = 'ja'): string => {
  if (!nameObject) return ''
  return nameObject[lang] || ''
}

export const hasThumbnail = (str: string): boolean => {
  return !!getThumbnail(str)
}

export const getThumbnail = (str: string): string => {
  if (!str) return ''

  let image: string = ''

  image = extractFirstImage(str)
  if (image) return image;

  const urls = extractUrls(str)

  if (!urls) return ''

  urls.map((url: string) => {
    const urlInfo = urlParse(url)
    const queries = queryString.parse(urlInfo.query.toString())

    switch (urlInfo.hostname) {
      case 'youtube.com':
      case 'jp.youtube.com':
      case 'www.youtube.com':
        if (queries.v) {
          // console.log('youtubeId', queries.v)
          image = `https://i.ytimg.com/vi/${queries.v}/hqdefault.jpg`
        }
        break
    }
  })

  return image
}

export const getSocialTitle = (str: string) => {
  if (!str) return str
  return decodeEntities(getTitle(str)).replace(new RegExp('&', 'g'), '%26')
}

export const getSummary = (str: string, length = 140) => {
  str = removeTitle(str)
  str = removeHtmlTags(str)
  const tail = str.length > length ? '...' : ''
  return str.substr(0, length) + tail
}

export const getTokens = (str: string) => {
  str = removeHtmlTags(str)
  return str ? str.match(/.{3}/g) : []
}

export const getLength = (str: string) => {
  return !str ? 0 : removeHtmlTags(str).length
}

export const stripTags = (content: string, linebreak = true) => {
  if (linebreak) {
    content = content.replace(/<\/p>/g, '</p>\n\n')
    content = content.replace(/<br \/>/g, '\n\n')
    content = content.replace(/<br\/>/g, '\n\n')
    content = content.replace(/<br>/g, '\n\n')
  }

  return !content
    ? ''
    : sanitizeHtml(content, {
      allowedTags: [],
    })
}

export function extractFirstImage(content: string): string {
  const images = extractImages(content)
  return images.length > 0 ? images[0] : ''
}

export function extractImages(content: string) {
  const imgTags = content.match(/<img.*?src\s*=\s*["|'](.*?)["|'].*?>/gi)
  if (!imgTags) return []
  const images: string[] = []
  imgTags.map(i => {
    const image = i.match(/src\s*=\s*["|'](.*?)["|']/i)
    if (image) images.push(image[1])
  })
  return images
}

export function isUrl(string: string): boolean {
  return /^http(s)?:\/\//.test(string)
}

export function extractUrls(content: string): string[] {
  if (!content) return []

  const urls = stripTags(content).match(
    /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=;#+]*)?/g
  )

  if (!urls) return []

  return _.uniq(urls).sort()
}

export function renderWidgets(content: string) {
  if (!content) return ''

  // const contentPlain = stripTags(content)
  const urls = extractUrls(content)
  if (!urls) return content

  content = content.replace(/"http/g, '"[http]')

  urls.reverse()

  let urlInfo: urlParse
  let queries = null
  let html = ''

  urls.forEach(url => {
    html = url
    urlInfo = urlParse(url)
    queries = queryString.parse(urlInfo.query.toString())

    switch (urlInfo.hostname) {
      case 'youtube.com':
      case 'jp.youtube.com':
      case 'www.youtube.com':
        if (queries.v) {
          // console.log('youtubeId', queries.v)
          html = `<span class="widget-youtube"><iframe src="https://www.youtube.com/embed/${queries.v}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></span>`
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
    : sanitizeHtml(content, {
      allowedTags: [
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
      allowedAttributes: {
        div: ['class'],
        a: ['href', 'name', 'target'],
        img: ['src', 'alt', 'title'],
      },
    })
}

export const decodeEntities = (str: string) => {
  if (!str) return str

  // console.log('Before:', str)

  const entities = [
    ['amp', '&'],
    ['apos', "'"],
    ['lt', '<'],
    ['gt', '>'],
  ]

  entities.map(entity => {
    str = str
      .replace('&quot;', '"')
      .replace(new RegExp('&' + entity[0] + ';', 'g'), entity[1])
  })

  return str
}
