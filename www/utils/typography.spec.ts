import { describe, it, expect } from 'vitest';
import { nl2br, removeHtmlTags } from './typography';

describe('nl2br()', () => {
  it('改行あり', () => {
    const str = "一行目\n二行目";
    const converted = nl2br(str);
    expect(nl2br(str).match('<br/>')).toBeTruthy();
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
    const str = '<a href="https://www.rippingyard.com" target="_blank">リンク</a>';
    const converted = removeHtmlTags(str);
    expect(converted.match(/<("[^"]*"|'[^']*'|[^'">])*>/g)).toBeFalsy();
  });
});
