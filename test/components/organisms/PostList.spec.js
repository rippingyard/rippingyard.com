import Vue from 'vue'
import { mount } from '@vue/test-utils'
import PostList from '~/components/organisms/PostList'

describe('PostList', () => {

  test('Vueのインスタンスである', () => {
    const wrapper = mount(PostList)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})
