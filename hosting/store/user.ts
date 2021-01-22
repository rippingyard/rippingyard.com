import { State } from '~/types/state'
import { User } from '~/types/user'
// import { db, timestamp } from '~/plugins/firebase'

// const scheme = {
//   owner:          null,
//   collaborators:  null,
//   content:        null,
//   status:         'published',
//   isDeleted:      false,
// }

export const state = () => ({
  users: {},
})

export const mutations = {
  setUser(state: State, u: User) {
    if (u.uid) state.users[u.uid] = u
  },
}

export const getters = {
  owner: ({ state, $fire }: { state: State; $fire: any }) => async (
    id: string
  ) => {
    let owner = null

    if (state.users[id]) {
      console.log('User: Hit Cache', id)
      owner = state.users[id]
    } else {
      await $fire.firestore
        .collection('users')
        .doc(id)
        .get()
        .then((doc: any) => {
          console.log('User: No Cache', id)
          owner = doc.data()
          if (owner) state.users[id] = owner
          console.log('userFromDB', owner)
        })
    }

    return owner
  },
}
