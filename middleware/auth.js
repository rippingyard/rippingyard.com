import { auth } from '~/plugins/firebase'
import User from '~/models/User'

export default function({ store, route, redirect }) {
  return new Promise(( resolve, reject ) => {
    auth.onAuthStateChanged(async u => {
      console.log('authStateChanged!', u)

      if( u ) {

        console.log('u', u);

        const db = new User()

        const user = await db.where('uid', '==', u.uid).first

        if (user) store.commit('auth/setMe', user)

        resolve(user)
      }

      resolve()
    })
  })
}
