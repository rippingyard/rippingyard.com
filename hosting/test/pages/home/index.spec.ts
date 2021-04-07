import { mount } from '@vue/test-utils'
const page = require('~/pages/home/index')

// let redirect = null
// let isAuthenticated = false
// const mocks = {
//   $isAuthenticated: () => {
//     return isAuthenticated
//   },
//   $router: {
//     push: (to: string) => {
//       redirect = to
//     },
//   },
// }

describe('/home', (): void => {
  test('Vueのインスタンスである', (): void => {
    const wrapper = mount(page)
    expect(wrapper.vm).toBeTruthy()
  })

  // test('ログインしていない時に、トップページにリダイレクトする', (): void => {
  //   redirect = null
  //   mount(page.default, {
  //     mocks,
  //   })
  //   expect(redirect).toBe('/login')
  // })

  // test('ログインしていたら、リダイレクトされない', () => {
  //   redirect = null
  //   isAuthenticated = true
  //   mount(page, {
  //     mocks,
  //   })
  //   expect(redirect).toBe(null)
  // })
})
