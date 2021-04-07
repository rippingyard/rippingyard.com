export type User = {
  id: string
  uid?: string
  displayName: string
  userName: string
  code?: string
  profile?: string
  avator?: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type UserState = {
  me: User | null
}

export type LoginParams = {
  email: string
  password: string
}
