import { mount } from '@vue/test-utils'
const page = require('~/pages/home/setting/index')

describe('/home/setting', (): void => {
  test('Vueのインスタンスである', (): void => {
    const wrapper = mount(page)
    expect(wrapper.vm).toBeTruthy()
  })
})
