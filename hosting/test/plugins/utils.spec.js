import { isAuthenticated } from '~/plugins/utils'

describe('Utils', () => {
  test('isAuth', () => {
    expect(isAuthenticated).toBeFalsy()
  })
})
