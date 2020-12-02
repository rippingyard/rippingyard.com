import { mount } from '@vue/test-utils'
import AdsensePostBottom from '~/components/atoms/Ad/AdsensePostBottom'

describe('AdsensePostBottom', () => {

  test('Vueのインスタンスである', () => {
    const wrapper = mount(AdsensePostBottom)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})
