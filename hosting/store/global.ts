import { Post } from '~/types/post'

type State = {
  posts: Post[],
}

export const state = (): State => ({
  posts: [],
})

export const mutations = {
  setPost(state: State, post: Post) {
    const index = state.posts.findIndex(p => p.id === post.id);
    if (index < 0) {
      state.posts.push(post)
    } else {
      state.posts[index] = post
    }
  },
}
