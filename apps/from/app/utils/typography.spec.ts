import { describe, it, expect } from 'vitest';

import { nl2br, removeHtmlTags, removeTitle, hasTitle } from './typography';

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

describe('hasTitle', () => {
  it('タイトルはある', () => {
    expect(hasTitle(html)).toBeTruthy();
  });
  it('タイトルがない', () => {
    expect(hasTitle('')).toBeFalsy();
  });
});
