import { sanitize, getSocialTitle, stripTags } from '~/plugins/typography'

const html = '<h1>タイトル</h1><p>ここがテキスト</p><p><script>alert("test")</script></p><h2>こちらはタイトルにはならない</h2><p>次のセンテンス。そして<a href="https://www.youtube.com" target="_blank" onClick="beat()">リンク</a>。</p>'

describe('Typography', () => {

  test('getSocialTitle', () => {
    expect(getSocialTitle('&')).toEqual('%26')
    expect(getSocialTitle('& <')).toEqual('%26 <')
  })

  test('stripTags', () => {
    expect(stripTags(html)).not.toContain('<a href')
    expect(stripTags(html)).not.toContain('script')
    expect(stripTags(html)).not.toContain('onClick')
  })

  test('sanitize', () => {
    expect(sanitize(html)).toContain('<a href')
    expect(sanitize(html)).not.toContain('script')
    expect(sanitize(html)).not.toContain('onClick')
  })

})
