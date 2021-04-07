import { shallowMount, createLocalVue } from '@vue/test-utils'
import vuex from 'vuex'
// import auth from '~/middleware/auth'
const page = require('~/pages/home/post/create/index')

// let isAuthenticated = false
// const mocks = {
//   $isAuthenticated: () => {
//     return isAuthenticated
//   },
// }

const localVue = createLocalVue()

localVue.use(vuex)

describe('/home/post/create', (): void => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        assign: jest.fn(),
      },
    })
  })

  test('Vueのインスタンスである', (): void => {
    const wrapper = shallowMount(page)
    // console.log(wrapper.vm.$options.middleware)
    expect(wrapper.vm).toBeTruthy()
  })

  // test('ログインしていない時に、トップページにリダイレクトする', (): void => {
  //   isAuthenticated = false

  //   mount(page.default, {
  //     localVue,
  //     mocks,
  //   })

  //   // expect(redirect).toBe('/login')
  //   expect(window.location.assign).toHaveBeenCalledWith('/login')
  //   // expect(window.location.pathname).toBe('/login')
  // })

  // test('ログインしていたら、リダイレクトされない', () => {
  //   isAuthenticated = true

  //   shallowMount(page, {
  //     localVue,
  //     mocks,
  //   })
  //   // expect(redirect).toBe(null)
  //   expect(window.location.assign).toHaveBeenCalledTimes(0)
  // })
})
