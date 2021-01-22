import { Post } from '~/types/post'
import { User } from '~/types/user'

export type RootState = {
  version: string
}

export type State = {
  auth: AuthState
  posts: {
    [id: string]: Post
  }
  users: {
    [id: string]: User
  }
}

export type AuthState = {
  me: null | User
}
