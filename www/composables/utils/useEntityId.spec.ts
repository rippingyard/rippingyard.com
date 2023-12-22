import { describe, it, expect } from 'vitest';
import { useEntityId } from './useEntityId';

describe('useEntityId', () => {
  it('正しくEntityKeyを返す', () => {
    const key = useEntityId('test', 'bookmark');
    expect(key).toBe('bookmark__test');
  });
});