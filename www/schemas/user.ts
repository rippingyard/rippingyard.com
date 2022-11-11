export type User = {
  uid: string
  displayName: string
  userName: string
  code?: string
  profile?: string
  avatar?: string
  role: 'mayor' | 'resident' | 'stranger'
  createdAt: string | Date
  updatedAt: string | Date
}

export type UserState = {
  me: User | null
}
