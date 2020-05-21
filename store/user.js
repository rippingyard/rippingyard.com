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
  owner: (state) => async (id) => {

    let owner = null

    // console.log('id', id)

    if (state.users[id]) {

      console.log('User: Hit Cache', id)
      owner = state.users[id]

    } else {

      await db.collection('users').doc(id).get().then(doc => {
        console.log('User: No Cache', id)
        owner = doc.data()
        if( owner ) state.users[id] = owner
        console.log('userFromDB', owner)
      })

    }

    return owner

  }
}
