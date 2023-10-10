import { describe, it, expect } from 'vitest';
import { getDomain, createToken, numberByString, isUrl } from './index';

describe('getDomain', () => {
  it('ローカルホストを返す', () => {
    expect(getDomain()).toBe('http://localhost:3333');
  });
});

describe('createToken', () => {
  it('文字数が適切', () => {
    expect(createToken(1).length).toBe(1);
    expect(createToken(32).length).toBe(32);
  });
});

describe('numberByString', () => {
  it('空文字の場合、0を返す', () => {
    expect(numberByString('')).toBe(0);
  });
});

describe('isUrl', () => {
  it('URLを入れるとtrueを返す', () => {
    expect(isUrl('https://www.rippingyard.com/')).toBeTruthy();
  });
  it('SSL非対応でもtrue', () => {
    expect(isUrl('http://www.rippingyard.com/')).toBeTruthy();
  });
  it('通常の文字列ではfalse', () => {
    expect(isUrl('URLが含まれていませんよ')).toBeFalsy();
  });
  it('途中にURLが含まれた文字列はfalse', () => {
    expect(isUrl('URL含まれてはいるけど、false。https://www.rippingyard.com/')).toBeFalsy();
  });
  it('プロトコルのみはfalse', () => {
    expect(isUrl('httpsについて、語り合いたいよね')).toBeFalsy();
  });
});
