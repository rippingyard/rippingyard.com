import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import { actions as entityActions } from '~/store/entity'

const config = {
  state: {
    auth: {
      me: {}
    }
  },
  actions: entityActions
}

describe('store/entity', () => {
  let store
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store(cloneDeep(config))
  })

  describe('actions', () => {
    test('getEntitiesFromContent', async () => {
      const entities = await store.dispatch('getEntitiesFromContent', "#魔法 #music たたたたたた。どうでしょうね。 #tetete")
      expect(entities.length).toBe(3)
    })
  })
})