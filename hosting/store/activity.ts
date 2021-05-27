import dayjs from 'dayjs'
import { ActionContext } from 'vuex'

import { Activity } from '~/types/activity'

interface ActionInterface {
  save: (
    { rootState }: ActionContext<any, any>,
    activity: Activity
  ) => void
  delete: ({ rootState }: ActionContext<any, any>, id: string) => void
  $fire?: any
}

export const scheme = {
  type: null,
  owner: null,
  payload: null,
  status: 'succeeded',
  createdAt: dayjs().toDate(),
  updatedAt: dayjs().toDate(),
}

export const actions: ActionInterface = {
  async save({ rootState }, activity) {
    try {
      if (!rootState.auth.me) {
        throw new Error('権限がありません')
      }

      console.log('saving an activity', activity)

      activity.updatedAt = dayjs().toDate()

      activity.createdAt = activity.createdAt
        ? dayjs(activity.createdAt).toDate()
        : dayjs().toDate()

      if (!activity.owner) {
        activity.owner = await this.$fire.firestore
          .collection('users')
          .doc(rootState.auth.me.uid)
      } else if (activity.owner.uid) {
        activity.owner = await this.$fire.firestore
          .collection('users')
          .doc(activity.owner.uid)
      }

      let db = this.$fire.firestore.collection('activities')

      db = activity.id ? db.doc(activity.id) : db.doc()
      activity.id = db.id

      console.log('saved activity', activity)

      await db.set(Object.assign(scheme, activity))

    } catch (e) {}
  },
  async delete({ rootState }, id): Promise<void> {
    if (!rootState.auth.me) {
      throw new Error('権限がありません')
    }

    await this.$fire.firestore.collection('activities').doc(id).delete()
  },
}
