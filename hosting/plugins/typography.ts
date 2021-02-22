import _ from 'lodash'
import urlParse from 'url-parse'
import queryString from 'query-string'
import sanitizeHtml from 'sanitize-html'

export const removeHtmlTag = (str: string) => {
  return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
}

export const removeTitle = (str: string) => {
  if (!str) return ''
  return str.replace(/<h.(?: .+?)?>.*?<\/h.>/, '')
}

export const getTitle = (str: string) => {
  if (!str) return ''
  const htag = str.match(/<h.(?: .+?)?>.*<\/h.>/)?.map(s => removeHtmlTag(s))
  if (htag && htag[0] !== '') return htag[0]
  return getSummary(str, 32)
}

export const getThumbnail = (str: string) => {
  if (!str) return null

  let image: null | string = null
  const urls = extractUrls(str)

  // console.log('urls:', urls)

  if (!urls) return null

  urls.map((url: string) => {
    const urlInfo = urlParse(url)
    const queries = queryString.parse(urlInfo.query.toString())

    switch (urlInfo.hostname) {
      case 'youtube.com':
      case 'jp.youtube.com':
      case 'www.youtube.com':
        if (queries.v) {
          console.log('youtubeId', queries.v)
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
  str = removeHtmlTag(str)
  const tail = str.length > length ? '...' : ''
  return str.substr(0, length) + tail
}

export const getTokens = (str: string) => {
  str = removeHtmlTag(str)
  return str ? str.match(/.{3}/g) : []
}

export const getLength = (str: string) => {
  return !str ? 0 : removeHtmlTag(str).length
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

export function extractUrls(content: string) {
  if (!content) return ''

  content = stripTags(content)

  let urls = content.match(
    /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=;#+]*)?/g
  )

  if (urls) urls = _.uniq(urls).sort()

  return urls
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
          'strong',
          'b',
          'i',
          'em',
          'a',
          'blockquote',
          'hr',
          'ul',
          'ol',
          'li',
          'br',
        ],
        allowedAttributes: {
          a: ['href', 'name', 'target'],
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

  // console.log('After:', str)

  return str
}
