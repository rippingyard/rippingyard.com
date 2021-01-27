// import _ from 'lodash'
// import moment from 'moment'
// import urlParse from 'url-parse'
// import queryString from 'query-string'
import dayjs from 'dayjs'
import { ActionContext } from 'vuex'
// import { entityStore } from '~/store/entity'
// import { sanitize, stripTags, getLength } from '~/plugins/typography'

import { Post } from '~/types/post'
import { State } from '~/types/state'

interface ActionInterface {
  save: (
    { rootState }: ActionContext<any, any>,
    { post }: { post: Post }
  ) => void
  $fire?: any
}

export const scheme = {
  slug: null,
  owner: null,
  collaborators: null,
  content: null,
  status: 'published',
  parent: null,
  entities: {
    byContent: [],
    byUser: [],
  },
  relatedPosts: {
    byUser: [],
    byTerm: [],
    expiredAt: null,
  },
  counts: {
    favorite: 0,
    bookmark: 0,
    pageview: 0,
  },
  isPublic: false,
  isDeleted: false,
  publishedAt: dayjs().toDate(),
  createdAt: dayjs().toDate(),
  updatedAt: dayjs().toDate(),
}

export const state = () => ({
  posts: {},
})

export const mutations = {
  setPost(state: State, { id, post }: { id: string; post: Post }) {
    state.posts[id] = post
  },
}

export const actions: ActionInterface = {
  async save({ rootState }, { post }) {
    try {
      // TODO: validation
      // TODO: auth処理
      if (!rootState.auth.me) {
        throw new Error('権限がありません')
      }

      // const entities = post.entities || scheme.entities
      // entities.byContent = await dispatch(
      //   'entity/getEntitiesFromContent',
      //   post.content,
      //   { root: true }
      // )
      // post.entities = entities

      // TODO: slug

      // console.log('postdata', post)

      post.updatedAt = dayjs().toDate()

      post.createdAt = post.createdAt
        ? dayjs(post.createdAt).toDate()
        : dayjs().toDate()
      post.publishedAt = post.publishedAt
        ? dayjs(post.publishedAt).toDate()
        : dayjs().toDate()

      if (!post.owner) {
        post.owner = await this.$fire.firestore
          .collection('users')
          .doc(rootState.auth.me.uid)
      } else if (post.owner.id) {
        post.owner = await this.$fire.firestore
          .collection('users')
          .doc(post.owner.id)
      }

      let db = this.$fire.firestore.collection('posts')

      db = post.id ? db.doc(post.id) : db.doc()

      await db
        .set(Object.assign(scheme, post))
        .then(() => {})
        .catch(() => {})
    } catch (e) {}
  },
  //   async delete({ rootState }, { id, notification }) {
  //     console.log('delete:', id)

  //     await db
  //       .collection('posts')
  //       .doc(id)
  //       .set(
  //         {
  //           isDeleted: true,
  //         },
  //         { merge: true }
  //       )
  //       .then(() => {
  //         if (notification) {
  //           notification.open({
  //             duration: 5000,
  //             message: '記事を削除しました',
  //             position: 'is-bottom-right',
  //             type: 'is-success',
  //             hasIcon: false,
  //           })
  //         }
  //       })
  //       .catch(() => {
  //         if (notification) {
  //           notification.open({
  //             duration: 5000,
  //             message: '記事の削除に失敗しました',
  //             position: 'is-bottom-right',
  //             type: 'is-danger',
  //             hasIcon: false,
  //           })
  //         }
  //       })
  //   },
}
