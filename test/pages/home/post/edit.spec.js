import { mount } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
import page from '~/pages/home/post/edit'

let redirect = null
let isAuthenticated = false
let mock = {
  $isAuthenticated: () => {
    return isAuthenticated
  },
  $buefy: {
    notification: {
      open: () => {
        return true
      }
    }
  },
  $router: {
    push: (to) => { redirect = to }
  }
}
const context = {
  query: {},
  error: jest.fn(),
  store: {}
}

describe('home/post/edit', () => {

  test('Vueのインスタンスである', () => {
    redirect = null
    const wrapper = mount(page, {
      mocks: mock,
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('ログインしていない時に、トップページにリダイレクトする', () => {
    redirect = null
    const wrapper = mount(page, {
      mocks: mock,
    })
    expect(redirect).toBe('/signin')
  })

  test('ログインしていたら、リダイレクトされない', () => {
    redirect = null
    isAuthenticated = true
    const wrapper = mount(page, {
      mocks: mock,
    })
    expect(redirect).toBe( null )
  })

  test('ログインしていたら、Wysiwygが表示される', async () => {
    redirect = null
    isAuthenticated = true
    const wrapper = await render(page)

    // console.log(wrapper)

    // wrapper.vm.$options.asyncData(context)

    // expect(wrapper.text()).toContain('<section></section>')
    expect(/記事更新/.test(wrapper.text())).toBeTruthy()
  })

})
