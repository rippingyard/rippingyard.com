import { db, timestamp } from '~/plugins/firebase'

// const scheme = {
//   owner:          null,
//   collaborators:  null,
//   content:        null,
//   status:         'published',
//   isDeleted:      false,
// }

export const state = () => ({
  users: {}
})

export const mutations = {
  setUser(state, u) {
    state.users[u.uid] = u
  }
}

export const actions = {
}

export const getters = {
  owner: (state) => (id) => {

    return state.users[id] || null

  }
}
