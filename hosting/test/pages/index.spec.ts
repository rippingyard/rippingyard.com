import { mount } from '@vue/test-utils'
// import { render } from '@vue/server-test-utils'
import page from '~/pages/index'

let redirect = null
let isAuthenticated = false
const mock = {
  $isAuthenticated: () => {
    return isAuthenticated
  },
  $buefy: {
    notification: {
      open: () => {
        return true
      },
    },
  },
  $router: {
    push: (to: string) => {
      redirect = to
    },
  },
}
const context = {
  query: {},
  error: jest.fn(),
  store: {},
}

describe('home/post/edit', () => {
  test('Vueのインスタンスである', () => {
    const wrapper = mount(page, {
      mocks: mock,
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
