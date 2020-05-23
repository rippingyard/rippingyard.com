import Vue from 'vue'
import { config, mount, RouterLinkStub } from '@vue/test-utils'
import PostList from '~/components/organisms/PostList'

config.stubs['nuxt-link'] = RouterLinkStub
config.stubs['SvgLogo'] = true

// Vue.config.ignoredElements = ['SvgLogo', 'nuxt-link']

describe('PostList', () => {

  test('Vueのインスタンスである', () => {
    const wrapper = mount(PostList)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // test('TOPへのリンクが存在する', () => {
  //   const wrapper = mount(PostList)
  //   expect(/TOP/.test(wrapper.text())).toBeTruthy()
  // })

})
