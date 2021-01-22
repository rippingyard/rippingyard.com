export type User = {
  id: string
  uid?: string
  createdAt: string
  publishedAt: string
  updatedAt: string
}

export type UserState = {
  me: User | null
}

export type LoginParams = {
  email: string
  password: string
}
