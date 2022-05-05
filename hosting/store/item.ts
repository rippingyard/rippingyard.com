import { ActionContext } from 'vuex'
import { Timestamp } from 'firebase/firestore'

import { Item } from '~/types/item'
import { State } from '~/types/state'

interface ActionInterface {
  getOne: ({ state }: ActionContext<any, any>, id: string) => void
  save: (
    { rootState }: ActionContext<any, any>,
    item: Item
  ) => void
  delete: ({ rootState }: ActionContext<any, any>, id: string) => void
  $fire?: any
}

export const scheme: Omit<Item, 'id'> = {
  name: null,
  status: 'published',
  type: 'unknown',
  entities: [],
  images: [],
  thumbnailImage: '',
  path: '',
  description: '',
  metadata: {},
  counts: {
    favorite: 0,
    bookmark: 0,
    pageview: 0,
  },
  isDeleted: false,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
}

type StateType = {
  items: { [id: string]: Item }
}

export const state = (): StateType => ({
  items: {},
})

export const mutations = {
  setItem(state: State, { id, item }: { id: string; item: Item }) {
    if (!state.items[id]) state.items[id] = item
  },
}

export const actions: ActionInterface = {
  async getOne(_, id): Promise<null | Item> {
    let item = null
    try {
      await this.$fire.firestore
        .collection('items')
        .doc(id)
        .get()
        .then((doc: any) => {
          item = doc.data()
        })
      return item
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async save({ rootState }, item: Partial<Item>) {
    try {
      // TODO: validation
      // TODO: auth処理
      if (!rootState.auth.me) {
        throw new Error('権限がありません')
      }

      item.updatedAt = Timestamp.now()

      item.createdAt = item.createdAt || Timestamp.now()

      let db = this.$fire.firestore.collection('items')

      db = item.id ? db.doc(item.id) : db.doc()
      item.id = db.id

      const newItem = { ...scheme, ...item }

      await db.set(newItem)

      return this.$fire.firestore.doc(db.path)

    } catch (e: any) {
      console.error(e)
      throw e
    }
  },
  async delete({ rootState }, id): Promise<void> {

    if (!rootState.auth.me) {
      throw new Error('権限がありません')
    }

    await this.$fire.firestore.collection('items').doc(id).set(
      {
        isDeleted: true,
      },
      { merge: true }
    )
  },
}

export const getters = {
  one: (state: State) => (id: string) => {
    return state.items[id] || null
  },
  all: (state: State) => () => {
    return state.items || []
  }
}
