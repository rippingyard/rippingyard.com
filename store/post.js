import { db, timestamp } from '~/plugins/firebase'
// import Post from '~/models/Post'
// import User from '~/models/User'

const scheme = {
  owner:          null,
  collaborators:  null,
  content:        null,
  status:         'published',
  isDeleted:      false,
}

export const actions = {
  async save({ commit, rootState }, { post, notification }) {

    // TODO: validation
    // TODO: auth処理
    // TODO: create / update

    const owner = await db.collection('users').doc(rootState.auth.me.uid)

    await db.collection('posts').doc().set(Object.assign(scheme, {
      content: post.content,
      owner: owner,
      createdAt: timestamp.now(),
      updatedAt: timestamp.now(),
    }))

    if( notification ) {
      notification.open({
        duration: 5000,
        message: '記事を投稿しました',
        position: 'is-bottom-right',
        type: 'is-success',
        hasIcon: false
      })
    }

  },
}