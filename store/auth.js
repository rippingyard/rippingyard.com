import { auth } from '~/plugins/firebase'
import User from '~/models/User'

export const state = () => ({
  me: null
})

export const mutations = {
  setMe(state, u) {
    state.me = u
  },
  removeMe(state) {
    state.me = null
  }
}

export const actions = {
  async signin({ commit }, { email, password, notification }) {

    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {

        const userRef = new User()

        userRef.db = userRef.ref().where('uid', '==', user.uid)
        const userData = (await userRef.first).data()

        // TODO: isDeletedの時はエラー
        // TODO: isBannedの時はエラー

        commit('setMe', {
          id: user.uid,
          userName: userData.userName,
          displayName: userData.displayName,
          role: userData.role,
        })

        if( notification ) {
          notification.open({
            duration: 5000,
            message: 'ログインしました',
            position: 'is-bottom-right',
            type: 'is-success',
            hasIcon: false
          })
        }

      })
      .catch(function(e) {

        commit('removeMe')

        if( notification ) {
          notification.open({
            duration: 5000,
            message: 'ログインに失敗しました',
            position: 'is-bottom-right',
            type: 'is-danger',
            hasIcon: false
          })
        }

      })
  },
}

export const getters = {
  isAuthenticated(state) {
    console.log('state', !!state.me)
    return !!state.me
  }
}
