import { DocumentData } from '@firebase/firestore-types'
import { Store } from 'vuex'
import { omit } from 'lodash'
import dayjs from 'dayjs'
import urlParse from 'url-parse'
import queryString from 'query-string'
import { sanitize, extractUrls } from '~/plugins/typography'
import { Post } from '~/types/post'
import { getDomain } from '~/plugins/util'

const { decycle } = require('json-cyclic')

interface Params {
  withoutOwner?: boolean
}

export async function normalize(
  id: string,
  post: DocumentData | undefined,
  store: Store<any>,
  params: Params = {
    withoutOwner: false,
  }
): Promise<Partial<Post>> {
  if (!post) return {}

  try {
    let owner: DocumentData = {}
    // TODO: owner.createdAt、owner.updatedAtを正しく処理する
    if (!params.withoutOwner && post.owner) {
      const cachedUser = await store.getters['user/one'](post.owner.uid)
      if (!cachedUser) {
        try {
          await post.owner?.get().then((doc: any) => {
            owner = omit(doc.data(), ['follows', 'followers'])
            // console.log('Owner from firestore')
            store.commit('user/setUser', owner)
          })
        } catch (e) {
          console.warn('Error', e)
        }
      } else {
        console.log('Cached!')
        owner = cachedUser
      }
    }

    return decycle({
      ...post,
      ...{
        id,
        permalink: permalink(id),
        sociallink: sociallink(id),
        content: filterContent(post.content),
        contentOriginal: post.content,
        // parent: null,

        owner,

        isDeleted: post.isDeleted,

        publishedAt: post.publishedAt
          ? dayjs(post.publishedAt.toDate()).format('YYYY-MM-DD HH:mm')
          : '',
        createdAt: post.createdAt
          ? dayjs(post.createdAt.toDate()).format('YYYY-MM-DD HH:mm')
          : '',
        updatedAt: post.updatedAt
          ? dayjs(post.updatedAt.toDate()).format('YYYY-MM-DD HH:mm')
          : '',
        //   length: getLength(post.content),
      },
    })
  } catch (e) {
    return Promise.reject(e)
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
    queries = queryString.parse(urlInfo.query.toString())

    // console.log('URL Info', urlInfo)

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
        html = `<a href="${url}" target="_blank">${url}</a>`
        break
    }

    content = content.replace(url, html)
  })

  content = content.replace(/"\[http\]/g, '"http')

  return content
}

export function permalink(id: string): string {
  return `/post/${id}`
}

export function editlink(id: string): string {
  return `/home/post/edit/${id}`
}

export function sociallink(id: string): string {
  return getDomain() + permalink(id)
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'published':
      return '公開中'
    case 'draft':
      return '下書き'
    default:
      return status
  }
}

export function getPublicLabel(isPublic: boolean): string {
  return isPublic ? '全世界' : '会員限定'
}
