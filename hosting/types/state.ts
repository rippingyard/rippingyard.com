import { Post } from '~/types/post'
import { User } from '~/types/user'

export type RootState = {
  version: string
}

export type State = {
  auth: AuthState
  posts: PostState
  users: UserState
}

export type AuthState = {
  me: null | User
  follows: []
  followers: []
  redirectPath: string
}

export type UserState = {
  [id: string]: User
}

export type PostState = {
  [id: string]: Post
}
