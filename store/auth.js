import { db, auth } from '~/plugins/firebase'
// import User from '~/models/User'

const permissions = {
  stranger: {
    login: true,
    post: false,
    comment: {
      self: true,
      other: false,
    }
  },
  resident: {
    login: true,
    post: {
      self: true,
      other: false,
    },
    comment: {
      self: true,
      other: false,
    }
  },
  god: true,
}

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
  can(store, permissionKey) {

    return new Promise((resolve, reject) => {

      if( !permissionKey || !store.state.me ) {
        resolve(  false )
        return
      }

      const role = store.state.me.role

      if( !role ) {
        resolve( false )
        return
      }

      const permission = permissions[role]

      if( !permission ) {
        resolve( false )
        return
      }

      if( typeof permission === 'boolean' ) {
        resolve( permission )
        return
      }

      const keys = permissionKey.split('.')

      // console.log('permissionKeys:', keys)
      console.log( 'role', store.state.me.role )

      console.log('typeof', permissionKey, typeof permission[keys[0]])
      console.log('permitted?', permissionKey, permission[keys[0]])

      if( typeof permission[keys[0]] === 'boolean' ) {
        resolve( permission[keys[0]] )
        return
      }

      // console.log('typeof2', permissionKey, typeof permission[keys[0]][keys[1]])
      // console.log('permitted2?', permissionKey, permission[keys[0]][keys[1]])

      if( typeof permission[keys[0]][keys[1]] === 'boolean' ) {
        resolve( permission[keys[0]][keys[1]] )
        return
      }

      resolve( false )

    })
  }
}

export const getters = {
  isAuthenticated(state) {
    // console.log('state', !!state.me)
    return !!state.me
  }
}
