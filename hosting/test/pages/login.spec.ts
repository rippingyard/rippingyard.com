import { mount } from '@vue/test-utils'
const page = require('~/pages/login')

describe('/login', (): void => {
  test('Vueのインスタンスである', (): void => {
    const wrapper = mount(page)
    expect(wrapper.vm).toBeTruthy()
  })
})
