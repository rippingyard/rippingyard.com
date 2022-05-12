import { DocumentData } from '@firebase/firestore-types'
import dayjs from 'dayjs'
import { User } from '~/types/user'

const { decycle } = require('json-cyclic')

export function normalize(
  uid: string,
  user: DocumentData | undefined,
): Partial<User> | undefined {
  if (!user) return {}
  try {
    return decycle({
      ...user,
      ...{
        uid,
        createdAt: user.createdAt
          ? dayjs(user.createdAt.seconds * 1000).format('YYYY-MM-DD HH:mm')
          : '',
        updatedAt: user.updatedAt
          ? dayjs(user.updatedAt.seconds * 1000).format('YYYY-MM-DD HH:mm')
          : '',
      },
    })
  } catch (e) {
    console.log('unnormalized', user, e)
    return {}
  }
}

export const isAuthenticatedByProvider = (u: any, provider: 'twitter.com') => !!u?.providerData.find((p: any) => p.providerId === provider)
