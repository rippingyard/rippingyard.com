import { mount } from '@vue/test-utils'
import PostForm from '~/components/molecules/PostForm'

describe('PostForm', () => {

  test('Vueのインスタンスである', () => {

    let redirect = null

    const wrapper = mount(PostForm, {
      mocks: {
        $isAuthenticated: () => { return false },
        $router: {
          push: (to) => { redirect = to }
        }
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('ログインしていない時に、トップページにリダイレクトする', () => {

    let redirect = null

    const wrapper = mount(PostForm, {
      mocks: {
        $isAuthenticated: () => { return false },
        $router: {
          push: (to) => { redirect = to }
        }
      },
    })
    expect(redirect).toBe('/')
  })

  test('ログインしている時に、新規投稿ボタンが表示される', () => {

    let redirect = null

    const wrapper = mount(PostForm, {
      mocks: {
        $isAuthenticated: () => { return true }
      },
    })
    expect(/新規投稿/.test(wrapper.text())).toBeTruthy()
  })

})
