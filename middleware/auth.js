import { auth } from '~/plugins/firebase'

export default function({ store, route, redirect }) {
  return new Promise(( resolve, reject ) => {
    auth.onAuthStateChanged(user => {
      console.log('authStateChanged!', user)
      if (user) {
        console.log('Authed!')
        store.commit('auth/setMe', user)
      }
      else {
        console.log('Not authed!')
        // store.commit('auth/removeMe')
      }
      resolve(user)
    })
  })
}
