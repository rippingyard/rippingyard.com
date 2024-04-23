import { describe, expect, it } from 'vitest';

import { usePostCondition } from './usePostConditions';

describe('usePostCondition', () => {
  it('デフォルトの値がセットされている', () => {
    const { args, where } = usePostCondition();
    expect(args).toHaveProperty('orderBy', {
      key: 'publishedAt',
      order: 'desc',
    });
    expect(where).toContainEqual({ key: 'isDeleted', val: false });
    expect(where).toContainEqual({ key: 'isPublic', val: true });
    expect(where).toContainEqual({ key: 'status', val: 'published' });
  });
});
