import { DocumentData } from '@firebase/firestore'
import { Timestamp } from '@firebase/firestore-types'

export type Secret = {
  id: string
  vendor: 'fcm'
  owner: DocumentData
  payload: any
  createdAt: Timestamp
  updatedAt: Timestamp
  expiredAt?: Timestamp
}
