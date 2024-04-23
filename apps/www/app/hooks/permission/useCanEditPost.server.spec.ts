import { describe, it, expect } from 'vitest';

import { Post } from '~/schemas/post';

import { useCanEditPost } from './useCanEditPost.server';
import { useDocReference } from '../firestore/useDocReference.server';

describe('canEditPost', () => {
  const canEditPost = useCanEditPost();
  const uid = 'user1';
  const post = {
    owner: useDocReference(uid, 'users'),
  } as Post;

  it('role: anonymousの場合、falseが返る', () => {
    expect(canEditPost(uid, 'anonymous', post)).toBeFalsy();
  });
  it('role: strangerで、自分の投稿の場合、trueが返る', () => {
    expect(canEditPost(uid, 'stranger', post)).toBeTruthy();
  }); // NOTE: strangerは投稿が出来ないが、もし別箇所の処理で投稿ができた場合、自分の投稿が編集できないのは要件を満たさないので、true
  it('role: strangerで、自分の投稿ではない場合、trueが返る', () => {
    expect(canEditPost('other', 'stranger', post)).toBeFalsy();
  });
  it('role: residentで、自分の投稿の場合、trueが返る', () => {
    expect(canEditPost(uid, 'resident', post)).toBeTruthy();
  });
  it('role: residentで、自分の投稿ではない場合、trueが返る', () => {
    expect(canEditPost('other', 'resident', post)).toBeFalsy();
  });
  it('role: mayorの場合、trueが返る', () => {
    expect(canEditPost(uid, 'mayor', post)).toBeTruthy();
  });
  it('role: lordの場合、trueが返る', () => {
    expect(canEditPost(uid, 'lord', post)).toBeTruthy();
  });
});
