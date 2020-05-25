import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Header from '~/components/organisms/Header'

describe('Header', () => {

  test('Vueのインスタンスである', () => {
    const wrapper = mount(Header, {
      mocks: {
        $isAuthenticated: () => { return false }
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('ログインしていない時', () => {
    const wrapper = mount(Header, {
      mocks: {
        $isAuthenticated: () => { return false }
      },
    })
    expect(/SIGN IN/.test(wrapper.text())).toBeTruthy()
    expect(/HOME/.test(wrapper.text())).toBeFalsy()
  })

  test('ログインしている時', () => {
    const wrapper = mount(Header, {
      mocks: {
        $isAuthenticated: () => { return true }
      },
    })
    expect(/SIGN IN/.test(wrapper.text())).toBeFalsy()
    expect(/HOME/.test(wrapper.text())).toBeTruthy()
  })

})
