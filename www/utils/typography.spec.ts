import { describe, it, expect } from 'vitest';
import { nl2br, removeHtmlTags, removeTitle, hasTitle, getTitle } from './typography';

const html = '<h1>タイトル</h1><h2>h2タイトル</h2><h3>h3タイトル</h3><p>本文<a href="https://www.rippingyard.com" target="_blank">リンク</a></p>';

describe('nl2br', () => {
  it('改行あり', () => {
    const str = "一行目\n二行目";
    const converted = nl2br(str);
    expect(converted.match('<br/>')).toBeTruthy();
  });
  it('改行なし', () => {
    const str = "一行しかない";
    const converted = nl2br(str);
    expect(converted.match('<br/>')).toBeFalsy();
  });
  it('空文字', () => {
    const str = "";
    const converted = nl2br(str);
    expect(converted.match('<br/>')).toBeFalsy();
  });
});

describe('removeHtmlTags', () => {
  it('HTMLタグが消えてる', () => {
    const converted = removeHtmlTags(html);
    expect(converted.match(/<("[^"]*"|'[^']*'|[^'">])*>/g)).toBeFalsy();
  });
});

describe('removeTitle', () => {
  const converted = removeTitle(html);
  it('H1タグが消えてる', () => {
    expect(converted.match(/<h1>/g)).toBeFalsy();
  });
  it('H2タグが消えてる', () => {
    expect(converted.match(/<h2>/g)).toBeFalsy();
  });
  it('H3タグが消えてる', () => {
    expect(converted.match(/<h3>/g)).toBeFalsy();
  });
  it('pタグは消えてない', () => {
    expect(converted.match(/<p>/g)).toBeTruthy();
  });
});

describe('hasTitle', () => {
  it('タイトルはある', () => {
    expect(hasTitle(html)).toBeTruthy();
  });
  it('タイトルがない', () => {
    expect(hasTitle('')).toBeFalsy();
  });
});

describe('getTitle', () => {
  it('空文字の場合は、空文字が返る', () => {
    expect(getTitle('')).toBe('');
  });
  describe('引数がstringの場合', () => {
    it('H1タグがある場合は、その中身が返る', () => {
      const str = '<h1>タイトルです</h1>';
      expect(getTitle(str)).toBe('タイトルです');
    });
    it('H2タグがある場合は、その中身が返る', () => {
      const str = '<h2>h2タイトルです</h2>';
      expect(getTitle(str)).toBe('h2タイトルです');
    });
    it('H3タグがある場合は、その中身が返る', () => {
      const str = '<h3>h3タイトルです</h3>';
      expect(getTitle(str)).toBe('h3タイトルです');
    });
    it('Hタグが複数ある場合は、最初のHタグが返る', () => {
      expect(getTitle('<h3>h3タイトルです</h3><h1>タイトルです</h1>')).toBe('h3タイトルです');
      expect(getTitle('<h2>h2タイトルです</h2><h3>h3タイトルです</h3>')).toBe('h2タイトルです');
    });
    it('Hタグがない場合は、その中身が返る', () => {
      const str = '<p>タイトルではありません</p>';
      expect(getTitle(str)).toBe('タイトルではありません');
    });
  });
});

// export const getTitle = (str: string | Post | OriginalPost, parent?: OriginalItem, length: number = 32, alt?: string) => {
//   if (!str) return ''
//   if (typeof str === 'string') {
//     const htags = getHtags(str)
//     if (htags && htags[0] !== '') return decodeEntities(htags[0])
//     return alt || getSummary(str, length)
//   } else {
//     const htags = getHtags(str.content)
//     if (htags && htags[0] !== '') return decodeEntities(htags[0])
//     if (parent && parent?.name?.ja) return parent.name.ja;
//     return alt || dayjs(str.publishedAt.toDate ? str.publishedAt.toDate() : str.publishedAt.seconds * 1000).format('YYYY年M月D日の記録');
//   }
// }
