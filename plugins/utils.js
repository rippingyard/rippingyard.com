import { auth } from '~/plugins/firebase'

const isAuthenticated = (store) => {
  return !store ? false : store.getters['auth/isAuthenticated']
}

const signOut = (store) => {
  auth.signOut()
    .then(() => {
      store.commit('auth/removeMe')
    })
}

export default ({}, inject) => {
  inject('isAuthenticated', isAuthenticated)
  inject('signOut', signOut)
}