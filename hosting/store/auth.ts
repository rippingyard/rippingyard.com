import { Store } from 'vuex'
// import { omit } from 'lodash'
import { AuthState } from '~/types/state'
import { User, LoginParams } from '~/types/user'

const { decycle } = require('json-cyclic')

interface ActionInterface {
  login: (
    { commit }: Store<any>,
    { email, password }: LoginParams
  ) => Promise<any>
  logout: ({ commit }: Store<any>) => void
  $fire?: any
}

export const state = () => ({
  me: null,
  follows: [],
  followers: [],
  redirectPath: '',
})

export type RootState = ReturnType<typeof state>

export const mutations = {
  setMe(state: AuthState, u: User): void {
    state.me = decycle(u)
  },
  removeMe(state: AuthState): void {
    state.me = null
  },
  storePath(state: AuthState, path: string) {
    state.redirectPath = path
  },
}

export const actions: ActionInterface = {
  logout({ commit, state }: Store<any>) {
    console.log('LOGOUT!', state)
    commit('removeMe')
  },
  async login({ commit }: Store<any>, { email, password }: LoginParams) {
    try {
      const res = await this.$fire.auth
        .signInWithEmailAndPassword(email, password)
      const { user } = res
      const userRef = await this.$fire.firestore
        .collection('users')
        .doc(user.uid)

      // TODO: isDeletedの時はエラー
      // TODO: isBannedの時はエラー

      userRef.get().then((doc: { data: () => void }) => {
        commit('setMe', doc.data())
      })
      
      return res
    } catch(e) {
      // console.warn('error', e)
      commit('removeMe')
      return e
    }
  },
}

export const getters = {
  isAuthenticated(state: AuthState) {
    console.log('Me', state.me)
    return !!state.me
  },
}
