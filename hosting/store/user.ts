import { uniqBy } from 'lodash'
// import dayjs from 'dayjs'
// import { followCursor } from 'tippy.js'
import { ActionContext } from 'vuex'
import { UserState } from '~/types/state'
import { User } from '~/types/user'

type State = {
  users: UserState
}

interface ActionInterface {
  getOne: ({ state }: ActionContext<any, any>, id: string) => void
  follow: ({ rootState }: ActionContext<any, any>, id: string) => void
  save: (
    { rootState }: ActionContext<any, any>,
    { user }: { user: User }
  ) => void
  $fire?: any
}

const scheme = {
  uid: null,
  displayName: '',
  profile: '',
  isBanned: false,
  isDeleted: false,
}

export const state = () => ({
  users: {},
})

export const mutations = {
  setUser(state: State, u: User) {
    if (!u) return
    if (u.uid) state.users[u.uid] = u
  },
}

export const actions: ActionInterface = {
  async getOne(_, id): Promise<null | User> {
    let user = null
    // console.log('$fire', this)
    try {
      await this.$fire.firestore
        .collection('users')
        .doc(id)
        .get()
        .then((doc: any) => {
          user = doc.data()
          // console.log('Mutations', mutations)
          // // if (user) mutations.setUser(state, user)
          // // if (user) state.users[id] = user
          // console.log('userFromDB', user)
        })
      return user
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async follow({ rootState }, id) {
    if (!rootState.auth.me) return

    const yourDoc = await this.$fire.firestore.collection('users').doc(id)

    const myDoc = this.$fire.firestore
      .collection('users')
      .doc(rootState.auth.me.uid)

    try {
      const me = (await myDoc.get()).data()
      const myFollows = me.follows || []
      myFollows.push(yourDoc)
      await myDoc.set({ follows: uniqBy(myFollows, 'id') }, { merge: true })

      const you = (await yourDoc.get()).data()
      const yourFollowers = you.followers || []
      yourFollowers.push(myDoc)
      await yourDoc.set(
        { followers: uniqBy(yourFollowers, 'id') },
        { merge: true }
      )
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async save({ rootState }, { user }) {
    try {
      // TODO: validation
      // TODO: auth処理

      if (!rootState.auth.me) {
        throw new Error('権限がありません')
      }

      // user.updatedAt = dayjs().toDate()

      // user.createdAt = user.createdAt
      //   ? dayjs(user.createdAt).toDate()
      //   : dayjs().toDate()

      let db = this.$fire.firestore.collection('users')

      db = user.uid ? db.doc(user.uid) : db.doc()

      const newUser: Partial<UserState> = Object.assign(scheme, user)

      await db.set(newUser, { merge: true })

      // .then((result: any) => {
      //   console.log('result', result)
      // })
      // .catch((error: any) => {
      //   console.log('error', error)
      // })
    } catch (e) {
      console.log('ERROR', e)
    }
  },
}

export const getters = {
  one: (state: State) => (id: string) => {
    return state.users[id] || null
  },
}
