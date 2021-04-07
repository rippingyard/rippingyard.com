import { removeHtmlTags, removeTitle, getTitle } from '~/plugins/typography'

const html =
  '<h1>タイトル</h1><p>本文本文1<br/>本文</p><h2>タイトル2</h2><p>なにが<strong>太字だ！</strong></p>'

describe('typography.removeHtmlTags', (): void => {
  test('HTMLタグが取り除かれている', (): void => {
    expect(removeHtmlTags(html)).toBe(
      'タイトル本文本文1本文タイトル2なにが太字だ！'
    )
  })
})

describe('typography.removeTitle', (): void => {
  test('タイトルが取り除かれている', (): void => {
    expect(removeTitle(html)).toBe(
      '<p>本文本文1<br/>本文</p><h2>タイトル2</h2><p>なにが<strong>太字だ！</strong></p>'
    )
  })
})

describe('typography.getTitle', (): void => {
  test('タイトルを取得', (): void => {
    expect(getTitle(html)).toBe('タイトル')
  })
})
