import { describe, it, expect } from 'vitest';

import { useCanCreatePost } from './useCanCreatePost';

describe('canCreatePost', () => {
  const canCreatePost = useCanCreatePost();

  it('role: anonymousの場合、falseが返る', () => {
    expect(canCreatePost('anonymous')).toBeFalsy();
  });
  it('role: strangerの場合、falseが返る', () => {
    expect(canCreatePost('stranger')).toBeFalsy();
  });
  it('role: residentの場合、trueが返る', () => {
    expect(canCreatePost('resident')).toBeTruthy();
  });
  it('role: mayorの場合、trueが返る', () => {
    expect(canCreatePost('mayor')).toBeTruthy();
  });
  it('role: lordの場合、trueが返る', () => {
    expect(canCreatePost('lord')).toBeTruthy();
  });
});
