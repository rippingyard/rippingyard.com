import { auth } from '~/plugins/firebase'
import User from '~/models/User'

export default function({ store, route, redirect }) {
  return new Promise(( resolve, reject ) => {
    auth.onAuthStateChanged(async u => {
      console.log('authStateChanged!', u)

      if( u ) {

        const db = new User()

        const user = await db.where('uid', '==', u.uid).first

        const userData = user.data()
        userData.id = user.id
        // userData.object = user

        if (user) store.commit('auth/setMe', userData)

        resolve(user)
      }

      resolve()
    })
  })
}
