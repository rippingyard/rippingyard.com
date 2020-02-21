import { auth } from '~/plugins/firebase'

export default function({ store, route, redirect }) {
  return new Promise(( resolve, reject ) => {
    auth.onAuthStateChanged(u => {
      console.log('authStateChanged!', u)
      if (u) store.commit('auth/setMe', u)
      resolve(u)
    })
  })
}
