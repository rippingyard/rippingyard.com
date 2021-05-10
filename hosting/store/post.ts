import dayjs from 'dayjs'
import { ActionContext } from 'vuex'

import { Post } from '~/types/post'
import { State } from '~/types/state'

interface ActionInterface {
  save: (
    { rootState }: ActionContext<any, any>,
    { post }: { post: Post }
  ) => void
  delete: ({ rootState }: ActionContext<any, any>, id: string) => void
  $fire?: any
}

export const scheme = {
  slug: null,
  owner: null,
  collaborators: null,
  content: null,
  status: 'published',
  type: 'log',
  parent: null,
  entities: [],
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
      } else if (post.owner.uid) {
        post.owner = await this.$fire.firestore
          .collection('users')
          .doc(post.owner.uid)
      }

      let db = this.$fire.firestore.collection('posts')

      db = post.id ? db.doc(post.id) : db.doc()
      post.id = db.id

      const newPost = Object.assign(scheme, post)

      console.log('saved post', post)

      await db.set(newPost)

      // saveIndex(indexName, {
      //   objectID: post.id,
      //   title: getTitle(post.content),
      //   body: stripTags(removeTitle(post.content)),
      //   image: getThumbnail(post.content),
      //   createdAt: dayjs(post.createdAt).format('YYYY-MM-DD HH:mm'),
      //   publishedAt: dayjs(post.publishedAt).format('YYYY-MM-DD HH:mm'),
      //   updatedAt: dayjs(post.updatedAt).format('YYYY-MM-DD HH:mm'),
      //   owner: post.owner?.uid,
      //   collaborators: [],
      //   tokens: getTokens(post.content),
      //   entities: getTokens(post.content),
      //   ...pick(newPost, [
      //     'content',
      //     'isDeleted',
      //     'isPublic',
      //     'type',
      //     'status',
      //   ]),
      // })

    } catch (e) {}
  },
  async delete({ rootState }, id): Promise<void> {
    console.log('delete:', id)

    if (!rootState.auth.me) {
      throw new Error('権限がありません')
    }

    // destroyIndex(indexName, id)

    await this.$fire.firestore.collection('posts').doc(id).set(
      {
        isDeleted: true,
      },
      { merge: true }
    )
  },
}
