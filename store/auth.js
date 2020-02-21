// import User from '~/models/User'

// export const strict = false

export const state = () => ({
  me: null
})

export const mutations = {
  setMe(state, u) {

    state.me = {
      id: u.uid,
      userName: u.userName,
      displayName: u.displayName,
      role: u.role,
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
