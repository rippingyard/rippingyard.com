import { describe, it, expect } from 'vitest';

import {
  nl2br,
  removeHtmlTags,
  removeTitle,
  hasTitle,
  removeMainTitle,
  getTitle,
  getMainTitle,
} from './typography';

const html =
  '<h1>タイトル</h1><h2>h2タイトル</h2><h3>h3タイトル</h3><p>本文<a href="https://www.rippingyard.com" target="_blank">リンク</a></p>';

describe('nl2br', () => {
  it('改行あり', () => {
    const str = '一行目\n二行目';
    const converted = nl2br(str);
    expect(converted.match('<br/>')).toBeTruthy();
  });
  it('改行なし', () => {
    const str = '一行しかない';
    const converted = nl2br(str);
    expect(converted.match('<br/>')).toBeFalsy();
  });
  it('空文字', () => {
    const str = '';
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

describe('removeMainTitle', () => {
  const converted = removeMainTitle(html);
  it('最初のH1タグが消えてる', () => {
    expect(converted.match(/<h1>/g)).toBeFalsy();
  });
  it('H2タグは消えてない', () => {
    expect(converted.match(/<h2>/g)).toBeTruthy();
  });
  it('H3タグは消えてない', () => {
    expect(converted.match(/<h3>/g)).toBeTruthy();
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
  it('タイトルは「タイトル」', () => {
    expect(getTitle(html)).toBe('タイトル');
  });
  it('2つ目以降のタイトルタグでも問題ない', () => {
    expect(getMainTitle(`<p>これはタイトルではない</p>${html}`)).toBe('');
  });
  it('タイトルは「タ」（文字数制限は無視）', () => {
    expect(getTitle(html, { titleLength: 1 })).toBe('タイトル');
  });
  it('タイトルがない場合は、サマリーが出る', () => {
    expect(getTitle('<p>いやいや</p>')).toBe('いやいや');
  });
  it('タイトルがない場合は、サマリーが出る（文字数制限）', () => {
    expect(getTitle('<p>いやいや</p>', { titleLength: 1 })).toBe('い...');
  });
});

describe('getMainTitle', () => {
  it('タイトルは「タイトル」', () => {
    expect(getMainTitle(html)).toBe('タイトル');
  });
  it('2つ目以降のタイトルタグは表示されない', () => {
    expect(getMainTitle(`<p>これはタイトルではない</p>${html}`)).toBe('');
  });
});
