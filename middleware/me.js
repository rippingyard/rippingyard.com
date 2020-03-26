import vuex from 'vuex'
import { auth } from '~/plugins/firebase'
import User from '~/models/User'

export default function({ store, route, redirect }) {
  return new Promise(( resolve, reject ) => {
    auth.onAuthStateChanged(u => {
      console.log('authStateChanged!', u)

      if( u ) {

        // const userRef = new User()

        // userRef.db = userRef.ref().where('uid', '==', u.uid)
        // const user = await userRef.first



        // const userData = user.data()
        // userData.id = user.id

        // const user = await userRef.ref().doc(u.uid)

        // console.log('userRef', user)

        // if (user) store.commit('auth/setMe', {
        //   user
        // })

        resolve()
      }

      resolve()
    })
  })
}
