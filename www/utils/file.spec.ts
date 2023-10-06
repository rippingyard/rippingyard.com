import { describe, it, expect } from 'vitest';
import { getExt } from './file';

describe('getExt', () => {
  it('png', () => {
    const image = {
      type: 'image/png',
    };
    const ext = getExt(image);
    expect(ext).toBe('png');
  });
  it('jpg', () => {
    const image = {
      type: 'image/jpg',
    };
    const ext = getExt(image);
    expect(ext).toBe('jpg');
  });
  it('jpeg', () => {
    const image = {
      type: 'image/jpeg',
    };
    const ext = getExt(image);
    expect(ext).toBe('jpg');
  });
  it('gif', () => {
    const image = {
      type: 'image/gif',
    };
    const ext = getExt(image);
    expect(ext).toBe('gif');
  });
});
