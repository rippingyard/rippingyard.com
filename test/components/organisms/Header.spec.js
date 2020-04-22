import Vue from 'vue'
import { config, mount } from '@vue/test-utils'
import Header from '~/components/organisms/Header'

config.stubs['nuxt-link'] = '<a href=""><slot /></a>'
config.stubs['SvgLogo'] = '<svg></svg>'

// Vue.config.ignoredElements = ['SvgLogo', 'nuxt-link']

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
    expect(/SIGN IN/.test(wrapper.text())).toBeTruthy()
    expect(/SIGN UP/.test(wrapper.text())).toBeTruthy()
    expect(/HOME/.test(wrapper.text())).toBeFalsy()
  })

  test('ログインしている時', () => {
    const wrapper = mount(Header, {
      mocks: {
        $isAuthenticated: () => { return true }
      }
    })
    expect(/SIGN IN/.test(wrapper.text())).toBeFalsy()
    expect(/SIGN UP/.test(wrapper.text())).toBeFalsy()
    expect(/HOME/.test(wrapper.text())).toBeTruthy()
  })

})
