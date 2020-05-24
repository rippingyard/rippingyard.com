import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Wysiwyg from '~/components/atoms/Wysiwyg'

describe('Wysiwyg', () => {

  test('Vueのインスタンスである', () => {
    const wrapper = mount(Wysiwyg)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})
