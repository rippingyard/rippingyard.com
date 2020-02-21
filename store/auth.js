// import User from '~/models/User'

// export const strict = false

export const state = () => ({
  me: null
})

export const mutations = {
  setMe(state, u) {
    // const handle = new User()
    // const user = handle
    //   .where('uid', '==', u.uid)
    //   .get()
    //   .then(( user ) => {
    //     state.me = user
    //   })
    //   .catch(( e ) => {
    //     console.log( u.uid, e )
    //   })
    state.me = {
      id: u.uid,
      email: u.email
    }
  },
  removeMe(state) {
    state.me = null
  }
}

export const actions = {
  setMe({ commit }, user) {
    commit('setMe', user)
  },
  removeMe({ commit }) {
    commit('removeMe')
  }
}

export const getters = {
  isAuthenticated(state) {
    console.log('state', state)
    return !!state.me
  }
}
