import { mount } from '@vue/test-utils'
const page = require('~/pages/index')

describe('/', (): void => {
  test('Vueのインスタンスである', (): void => {
    const wrapper = mount(page)
    expect(wrapper.vm).toBeTruthy()
  })
})
