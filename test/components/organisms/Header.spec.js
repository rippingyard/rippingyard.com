import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Header from '~/components/organisms/Header'

Vue.config.ignoredElements = ['b-navbar', 'b-navbar-item', 'b-navbar-dropdown']

describe('Header', () => {

  test('Vueのインスタンスである', () => {
    const wrapper = mount(Header, {
      mocks: {
        $isAuthenticated: () => { return false }
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('ログインしていない時', () => {
    const wrapper = mount(Header, {
      mocks: {
        $isAuthenticated: () => { return false }
      }
    })
    // console.log(wrapper.text())
    expect(/ログイン/.test(wrapper.text())).toBeTruthy()
    expect(/新規登録/.test(wrapper.text())).toBeTruthy()
    expect(/ホーム/.test(wrapper.text())).toBeFalsy()
  })

  test('ログインしている時', () => {
    const wrapper = mount(Header, {
      mocks: {
        $isAuthenticated: () => { return true }
      }
    })
    expect(/ログイン/.test(wrapper.text())).toBeFalsy()
    expect(/新規登録/.test(wrapper.text())).toBeFalsy()
    expect(/ホーム/.test(wrapper.text())).toBeTruthy()
  })

})
