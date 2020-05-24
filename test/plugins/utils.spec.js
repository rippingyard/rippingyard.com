import Vue from 'vue'
// import { mount } from '@vue/test-utils'
import { isAuthenticated } from '~/plugins/utils'

describe('Utils', () => {

  test('isAuth', () => {
    expect(isAuthenticated).toBeFalsy()
  })

})
