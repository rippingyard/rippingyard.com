import { ActionContext } from 'vuex'
import { UserState } from '~/types/state'
import { User } from '~/types/user'
// import { db, timestamp } from '~/plugins/firebase'

type State = {
  users: UserState
}

interface ActionInterface {
  getOne: ({ state }: { state: State }, id: string) => void
  $fire?: any
}

// const scheme = {
//   owner:          null,
//   collaborators:  null,
//   content:        null,
//   status:         'published',
//   isDeleted:      false,
// }

export const state = () => ({
  users: {},
})

export const mutations = {
  setUser(state: State, u: User) {
    if (u.uid) state.users[u.uid] = u
  },
}

export const actions: ActionInterface = {
  async getOne({ state }: { state: State }, id: string): Promise<null | User> {
    let owner = null
    console.log('$fire', this)
    try {
      await this.$fire.firestore
        .collection('users')
        .doc(id)
        .get()
        .then((doc: any) => {
          owner = doc.data()
          if (owner) state.users[id] = owner
          console.log('userFromDB', owner)
        })
      return owner
    } catch (e) {
      return Promise.reject(e)
    }
  },
}

export const getters = {
  one: (state: State) => async (id: string) => {
    if (!state.users[id]) {
      console.log('No Cache!', id)
      // await actions.getOne({ state }, id)
    }
    return state.users[id] || null
  },
}
