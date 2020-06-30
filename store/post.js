import _ from 'lodash'
import moment from 'moment'
import urlParse from 'url-parse'
import queryString from 'query-string'
import { db, timestamp } from '~/plugins/firebase'
import { sanitize, stripTags, getLength } from '~/plugins/typography'

export const scheme = {
  slug:           null,
  owner:          null,
  collaborators:  null,
  content:        null,
  status:         'published',
  parent:         null,
  relatedEntities: null,
  relatedPosts: {
    byUser: null,
    byTerm: null,
    expiredAt: null,
  },
  counts: {
    favorite: 0,
    bookmark: 0,
    pageview: 0,
  },
  isPublic:       false,
  isDeleted:      false,
  publishedAt:    timestamp.now(),
  createdAt:      timestamp.now(),
  updatedAt:      timestamp.now(),
}

export const state = () => ({
  posts: {}
})

export const mutations = {

  setPost(state, { id, post }) {
    state.posts[id] = post
  }

}

export const actions = {
  async save({ rootState }, { post, notification }) {

    // TODO: validation
    // TODO: auth処理
    if( !rootState.auth.me ) {
      if( notification ) {
        notification.open({
          duration: 5000,
          message: 'ログインしてください',
          position: 'is-bottom-right',
          type: 'is-danger',
          hasIcon: false
        })
      }
    }

    // TODO: slug

    // console.log('postdata', post)

    post.updatedAt = timestamp.now()

    post.createdAt = post.createdAt ? timestamp.fromDate(post.createdAt) : timestamp.now()
    post.publishedAt = post.publishedAt ? timestamp.fromDate(post.publishedAt) : timestamp.now()

    if( !post.owner ) {
      post.owner = await db.collection('users').doc(rootState.auth.me.uid)
    } else if( post.owner.id ) {
      post.owner = await db.collection('users').doc(post.owner.id)
    }

    let dbHandler = db.collection('posts')

    dbHandler = post.id ? dbHandler.doc(post.id) : dbHandler.doc()

    await dbHandler.set(Object.assign(scheme, post)).then(() => {
      if( notification ) {
        notification.open({
          duration: 5000,
          message: post.id ? '記事を更新しました' : '記事を投稿しました',
          position: 'is-bottom-right',
          type: 'is-success',
          hasIcon: false
        })
      }
    }).catch(() => {
      if( notification ) {
        notification.open({
          duration: 5000,
          message: post.id ? '記事の更新に失敗しました' : '記事の投稿に失敗しました',
          position: 'is-bottom-right',
          type: 'is-danger',
          hasIcon: false
        })
      }
    })
  },
  async delete({ rootState }, { id, notification }) {

    console.log('delete:', id)

    await db.collection('posts').doc(id).set({
      isDeleted: true
    }, { merge: true }).then(() => {
      if( notification ) {
        notification.open({
          duration: 5000,
          message: '記事を削除しました',
          position: 'is-bottom-right',
          type: 'is-success',
          hasIcon: false
        })
      }
    }).catch(() => {
      if( notification ) {
        notification.open({
          duration: 5000,
          message: '記事の削除に失敗しました',
          position: 'is-bottom-right',
          type: 'is-danger',
          hasIcon: false
        })
      }
    })

  }
}

export function normalize(id, post) {
  return Object.assign(
    post,
    {
      id: id,
      permalink: permalink(id),
      sociallink: sociallink(id),
      content: filterContent(post.content),
      contentOriginal: post.content,
      parent: null,

      publishedAt: post.publishedAt ? moment(post.publishedAt.toDate()).format('YYYY-MM-DD HH:mm:ss') : '',
      createdAt: post.createdAt ? moment(post.createdAt.toDate()).format('YYYY-MM-DD HH:mm:ss') : '',
      updatedAt: post.updatedAt ? moment(post.updatedAt.toDate()).format('YYYY-MM-DD HH:mm:ss') : '',
      length: getLength( post.content )
    }
  )
}

export function filterContent(content) {

  if( !content ) return ''

  content = sanitize(content)
  content = renderWidgets(content)

  return content

}

export function renderWidgets(content) {

  if( !content ) return ''

  // const contentPlain = stripTags(content)
  const urls = extractUrls( content )

  content = content.replace(/"http/g, '"[http]')

  if( !urls ) return content

  urls.reverse()

  let urlInfo = null
  let queries = null
  let html = ''

  urls.forEach(url => {

    html = url
    urlInfo = urlParse(url)
    queries = queryString.parse(urlInfo.query)

    console.log(urlInfo)

    switch(urlInfo.hostname) {

      case 'youtube.com':
      case 'www.youtube.com':
        if( queries.v ) {
          console.log('youtubeId', queries.v)
  
          html = `<span class="widget-youtube"><iframe src="https://www.youtube.com/embed/${ queries.v }" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></span>`
  
        }
      break

      default:
        html = `<a href="${ url }" target="_blank">${ url }</a>`
      break

    }

    content = content.replace( url, html )
    
  })

  content = content.replace(/"\[http\]/g, '"http')

  return content

}

export function extractUrls( content ) {

  if( !content ) return ''
  
  content = stripTags(content)

  let urls = content.match( /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=;#+]*)?/g )

  if( urls ) urls = _.uniq(urls).sort()

  return urls

}

export function permalink(id) {
  return '/post/' + id
}

export function sociallink(id) {
  const domain = process.env.NODE_ENV !== 'production' ? 'https://rippingyard-dev.web.app' : 'https://www.rippingyard.com'
  return domain + permalink(id)
}
