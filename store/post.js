import moment from 'moment'
import { db, timestamp } from '~/plugins/firebase'
import { getLength } from '~/plugins/typography'

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
  publishedAt:    null,
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
  async save({ commit, rootState }, { post, notification }) {

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

    // TODO: create / update

    const owner = await db.collection('users').doc(rootState.auth.me.uid)

    await db.collection('posts').doc().set(Object.assign(scheme, {
      content: post.content,
      isPublic: post.isPublic,
      owner: owner,
      publishedAt: timestamp.now(),
      createdAt: timestamp.now(),
      updatedAt: timestamp.now(),
    })).then(() => {
      if( notification ) {
        notification.open({
          duration: 5000,
          message: '記事を投稿しました',
          position: 'is-bottom-right',
          type: 'is-success',
          hasIcon: false
        })
      }
    }).catch(() => {
      if( notification ) {
        notification.open({
          duration: 5000,
          message: '記事の投稿に失敗しました',
          position: 'is-bottom-right',
          type: 'is-danger',
          hasIcon: false
        })
      }
    })
  },
}

export function normalize(id, post) {
  return Object.assign(
    post,
    {
      id: id,
      permalink: permalink(id),
      sociallink: sociallink(id),
      parent: null,

      publishedAt: moment(post.publishedAt.toDate()).format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment(post.createdAt.toDate()).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment(post.updatedAt.toDate()).format('YYYY-MM-DD HH:mm:ss'),
      length: getLength( post.content )
    }
  )
}

export function permalink(id) {
  return '/post/' + id
}

export function sociallink(id) {
  const domain = process.env.NODE_ENV !== 'production' ? 'https://rippingyard-dev.web.app' : 'https://www.rippingyard.com'
  return domain + permalink(id)
}
