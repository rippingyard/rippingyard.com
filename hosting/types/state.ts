import { Post } from '~/types/post'
import { Item } from '~/types/item'
import { User } from '~/types/user'
import { Comment } from '~/types/comment'

export type RootState = {
  version: string
}

export type State = {
  auth: AuthState
  posts: PostState
  items: ItemState
  comments: CommentState
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

export type ItemState = {
  [id: string]: Item
}

export type CommentState = {
  [id: string]: Comment
}

export type SnackState = {
  isOpen: boolean
  message: string
  type: 'info' | 'warn' | 'danger' | 'fatal'
}
