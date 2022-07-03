import { Timestamp } from 'firebase/firestore'
import { ActionContext } from 'vuex'

import { Secret } from '~/types/secret'

interface ActionInterface {
  save: (
    { rootState }: ActionContext<any, any>,
    secret: Secret
  ) => void
  delete: ({ rootState }: ActionContext<any, any>, id: string) => void
  $fire?: any
}

export const scheme: Omit<Secret, 'id' | 'owner' | 'vendor' | 'payload'> = {
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
}

export const state = () => ({
  secrets: {},
})

export const actions: ActionInterface = {
  async save({ rootState }, secret): Promise<Secret> {
    try {
      // TODO: validation
      // TODO: auth処理
      if (!rootState.auth.me) {
        throw new Error('権限がありません')
      }

      const userId = rootState.auth.me.uid
      secret.owner = await this.$fire.firestore
        .collection('users')
        .doc(userId)

      secret.createdAt = secret.createdAt || Timestamp.now()
      secret.updatedAt = Timestamp.now()

      const id = secret.id || `${userId}-${secret.vendor}`
      const db = this.$fire.firestore.collection('secrets').doc(id)
      secret.id = db.id

      const newSecret = Object.assign(scheme, secret)

      await db.set(newSecret)

      return newSecret
    } catch (e) {
      console.error(e)
      throw e
    }
  },
  async delete({ rootState }, id): Promise<void> {

    if (!rootState.auth.me) {
      throw new Error('権限がありません')
    }

    await this.$fire.firestore.collection('secrets').doc(id).delete();
  },
}
