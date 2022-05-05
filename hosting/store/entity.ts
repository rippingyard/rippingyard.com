import { Timestamp } from 'firebase/firestore'
import { ActionContext } from 'vuex'

import { Entity } from '~/types/entity'

interface ActionInterface {
  save: (
    { rootState }: ActionContext<any, any>,
    entity: Entity
  ) => Promise<void>
  delete: ({ rootState }: ActionContext<any, any>, id: string) => void
  destroyAll: ({ rootState }: ActionContext<any, any>) => void
  $fire?: any
}

export const scheme = {
  aliases: [],
  owner: null,
  collaborators: [],
  content: null,
  related: {
    posts: [],
    entities: [],
    expiredAt: null,
  },
  counts: {
    favorite: 0,
    bookmark: 0,
    pageview: 0,
  },
  isPublic: true,
  isDeleted: false,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
}

export const actions: ActionInterface = {
  async save({ rootState }, entity) {
    try {

      // TODO: validation
      // TODO: auth処理
      if (!rootState.auth.me) {
        throw new Error('権限がありません')
      }

      entity.updatedAt = Timestamp.now()
      entity.createdAt = entity.createdAt || Timestamp.now()

      if (!entity.owner) {
        entity.owner = await this.$fire.firestore
          .collection('users')
          .doc(rootState.auth.me.uid)
      } else if (entity.owner.uid) {
        entity.owner = await this.$fire.firestore
          .collection('users')
          .doc(entity.owner.uid)
      }

      let db = this.$fire.firestore.collection('entities')

      db = entity.id ? db.doc(entity.id) : db.doc()
      entity.id = db.id

      const newEntity = Object.assign(scheme, entity)

      await db.set(newEntity)

    } catch (e) {}
  },
  async delete({ rootState }, id): Promise<void> {

    if (!rootState.auth.me) {
      throw new Error('権限がありません')
    }

    // destroyIndex(indexName, id)

    await this.$fire.firestore.collection('entities').doc(id).set(
      {
        isDeleted: true,
      },
      { merge: true }
    )
  },
  async destroyAll({ rootState }): Promise<void> {

    if (!rootState.auth.me) {
      throw new Error('権限がありません')
    }

    const entities = await this.$fire.firestore.collection('entities').get()

    const promises: any[] = []
    entities.forEach((doc: any) => {
      promises.push(this.$fire.firestore.collection('entities').doc(doc.id).delete())
    })

    if (promises) await Promise.all(promises)

  },
}
