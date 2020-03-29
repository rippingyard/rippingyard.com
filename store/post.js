import { db, timestamp } from '~/plugins/firebase'
import Post from '~/models/Post'
import User from '~/models/User'

export const actions = {
  async save({ commit, rootState }, { post, notification }) {

    // TODO: auth処理

    const userRef = new User()
    const owner = await userRef.ref().doc(rootState.auth.me.id)

    const postRef = new Post()
    await postRef.ref().doc().set(postRef.setting({
      content: post.content,
      owner: owner,
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