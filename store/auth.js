import { db, auth } from '~/plugins/firebase'
// import User from '~/models/User'

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

        const userRef = await db.collection('users').doc(user.uid)
        // console.log(user.uid);
        // console.log(userRef)
        // const userData = userRef.data()

        // TODO: isDeletedの時はエラー
        // TODO: isBannedの時はエラー

        userRef.get().then(doc => {
          // console.log(doc);
          commit('setMe', doc.data())
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
