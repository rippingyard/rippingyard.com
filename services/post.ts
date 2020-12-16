import { DocumentData } from '@firebase/firestore-types'
import _ from 'lodash'
import dayjs from 'dayjs'
import urlParse from 'url-parse'
import queryString from 'query-string'
import { sanitize, stripTags, getLength } from '~/plugins/typography'

export type TPost = {
  id: string
  content: string
  contentOriginal: string
}

export function normalize(id: string, post: TPost) {
  return {
    ...post,
    ...{
      id,
      //   permalink: permalink(id),
      //   sociallink: sociallink(id),
      content: filterContent(post.content),
      contentOriginal: post.content,
      //   parent: null,

      owner: '',

      publishedAt: '',
      createdAt: '',
      updatedAt: '',

      //   publishedAt: post.publishedAt
      //     ? dayjs(post.publishedAt).format('YYYY-MM-DD HH:mm:ss')
      //     : '',
      //   createdAt: post.createdAt
      //     ? dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')
      //     : '',
      //   updatedAt: post.updatedAt
      //     ? dayjs(post.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      //     : '',
      //   length: getLength(post.content),
    },
  }
}

export function filterContent(content: string) {
  if (!content) return ''

  content = sanitize(content)
  content = renderWidgets(content)

  return content
}

export function renderWidgets(content: string) {
  if (!content) return ''

  // const contentPlain = stripTags(content)
  const urls = extractUrls(content)

  content = content.replace(/"http/g, '"[http]')

  if (!urls) return content

  urls.reverse()

  let urlInfo: urlParse
  let queries = null
  let html = ''

  urls.forEach(url => {
    html = url
    urlInfo = urlParse(url)
    console.log(urlInfo.query)
    queries = queryString.parse(urlInfo.query)

    console.log(urlInfo)

    switch (urlInfo.hostname) {
      case 'youtube.com':
      case 'jp.youtube.com':
      case 'www.youtube.com':
        if (queries.v) {
          console.log('youtubeId', queries.v)
          html = `<span class="widget-youtube"><iframe src="https://www.youtube.com/embed/${queries.v}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></span>`
        }
        break

      default:
        html = `<a href="${url}" target="_blank">${url}</a>`
        break
    }

    content = content.replace(url, html)
  })

  content = content.replace(/"\[http\]/g, '"http')

  return content
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

export function permalink(id: string) {
  return '/post/' + id
}

export function sociallink(id: string) {
  const domain =
    process.env.NODE_ENV !== 'production'
      ? 'https://rippingyard-dev.web.app'
      : 'https://www.rippingyard.com'
  return domain + permalink(id)
}
