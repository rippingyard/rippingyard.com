import { Timestamp } from 'firebase/firestore'
import { ActionContext } from 'vuex'

import { Post } from '~/types/post'
import { State } from '~/types/state'

interface ActionInterface {
  save: (
    { rootState }: ActionContext<any, any>,
    post: Post
  ) => void
  delete: ({ rootState }: ActionContext<any, any>, id: string) => void
  $fire?: any
}

export const scheme: Omit<Post, 'id' | 'contentOriginal'> = {
  slug: '',
  owner: null,
  colaborators: [],
  content: '',
  status: 'published',
  type: 'log',
  entities: [],
  items: [],
  // relatedPosts: {
  //   byUser: [],
  //   byTerm: [],
  //   expiredAt: null,
  // },
  counts: {
    favorite: 0,
    bookmark: 0,
    pageview: 0,
  },
  isPublic: false,
  isDeleted: false,
  publishedAt: Timestamp.now(),
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
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
  async save({ rootState }, post): Promise<Post> {
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

      post.updatedAt = Timestamp.now()

      post.createdAt = post.createdAt || Timestamp.now()
      post.publishedAt = post.publishedAt || Timestamp.now()

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

      await db.set(newPost)

      return newPost

    } catch (e) {
      console.error(e)
      throw e
    }
  },
  async delete({ rootState }, id): Promise<void> {

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
