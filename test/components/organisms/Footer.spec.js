import Vue from 'vue'
import { config, mount, RouterLinkStub } from '@vue/test-utils'
import Footer from '~/components/organisms/Footer'

config.stubs['nuxt-link'] = RouterLinkStub
config.stubs['SvgLogo'] = true

// Vue.config.ignoredElements = ['SvgLogo', 'nuxt-link']

describe('Footer', () => {

  test('Vueのインスタンスである', () => {
    const wrapper = mount(Footer)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('TOPへのリンクが存在する', () => {
    const wrapper = mount(Footer)
    expect(/TOP/.test(wrapper.text())).toBeTruthy()
  })

})
