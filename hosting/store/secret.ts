import { Timestamp } from 'firebase/firestore'
import { ActionContext } from 'vuex'

import { Secret } from '~/types/secret'

interface ActionInterface {
  getMine: (
    { rootState }: ActionContext<any, any>,
    vendor?: string,
  ) => Promise<Secret[]>
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
  async getMine({ rootState }, vendor): Promise<Secret[]> {
    const secrets: Secret[] = []

    if (!rootState.auth.me) {
      throw new Error('権限がありません')
    }

    const userId = rootState.auth.me.uid
    const owner = await this.$fire.firestore
      .collection('users')
      .doc(userId)

    let db = this.$fire.firestore.collection('secrets').where('owner', '==', owner)

    if (vendor) db = db.where('vendor', '==', vendor)

    const qs = await db.get();

    if (qs.empty) return secrets

    qs.forEach((doc: any) => {
      secrets.push(doc)
    })

    return secrets
  },
  async save({ rootState }, secret): Promise<Secret> {
    try {
      // TODO: validation
      if (!('vendor' in secret)) {
        throw new Error('ベンダーを指定してください')
      }

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

      let db = this.$fire.firestore.collection('secrets')
      db = secret.id ? db.doc(secret.id) : db.doc()

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
