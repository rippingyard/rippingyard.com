import dayjs from 'dayjs'
import { ActionContext } from 'vuex'

import { Comment } from '~/types/comment'
import { State } from '~/types/state'

interface ActionInterface {
  save: (
    { rootState }: ActionContext<any, any>,
    { comment }: { comment: Comment }
  ) => void
  delete: ({ rootState }: ActionContext<any, any>, id: string) => void
  $fire?: any
}

export const scheme = {
  owner: null,
  collaborators: null,
  content: null,
  status: 'published',
  parent: null,
  entities: [],
  counts: {
    favorite: 0,
    pageview: 0,
  },
  isDeleted: false,
  createdAt: dayjs().toDate(),
  updatedAt: dayjs().toDate(),
}

export const state = () => ({
  comments: {},
})

export const mutations = {
  setPost(state: State, { id, comment }: { id: string; comment: Comment }) {
    state.comments[id] = comment
  },
}

export const actions: ActionInterface = {
  async save({ rootState }, { comment }) {
    try {
      console.log('Posted Comment', comment)

      // TODO: validation
      // TODO: auth処理
      if (!rootState.auth.me) {
        throw new Error('権限がありません')
      }

      comment.updatedAt = dayjs().toDate()

      comment.createdAt = comment.createdAt
        ? dayjs(comment.createdAt).toDate()
        : dayjs().toDate()

      if (!comment.owner) {
        comment.owner = await this.$fire.firestore
          .collection('users')
          .doc(rootState.auth.me.uid)
      } else if (comment.owner.uid) {
        comment.owner = await this.$fire.firestore
          .collection('users')
          .doc(comment.owner.uid)
      }

      if (comment.parentId) {
        comment.parent = await this.$fire.firestore.doc(comment.parentId)
        console.log('Parent', comment.parent)
        delete comment.parentId
      }

      let db = this.$fire.firestore.collection('comments')

      db = comment.id ? db.doc(comment.id) : db.doc()
      comment.id = db.id

      const newComment = Object.assign(scheme, comment)

      console.log('saved comment', newComment)

      await db.set(newComment)

    } catch (e) {}
  },
  async delete({ rootState }, id): Promise<void> {
    console.log('delete:', id)

    if (!rootState.auth.me) {
      throw new Error('権限がありません')
    }

    // destroyIndex(indexName, id)

    await this.$fire.firestore.collection('comments').doc(id).set(
      {
        isDeleted: true,
      },
      { merge: true }
    )
  },
}
