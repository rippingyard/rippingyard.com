import { describe, expect, it } from 'vitest';

import { useSavePost } from './useSavePost.server';

const savePost = useSavePost();

const uid = 'user1';
const payload = {
  contentBody: '<p>An article for test</p>',
  uid,
};

describe('useSavePost', () => {
  describe('正常系', async () => {
    it('返り値がある', async () => {
      const result = await savePost(payload);
      expect(result).toBeTruthy();
    });
    it('statusのデフォルト値はdraftedである', async () => {
      const { post } = await savePost(payload);
      expect(post.status).toBe('drafted');
    });
    it('statusの値はpayload.statusと同一である', async () => {
      const { post } = await savePost({
        ...payload,
        status: 'published',
      });
      expect(post.status).toBe('published');
    });
    it('isPublicのデフォルト値はfalseである', async () => {
      const { post } = await savePost(payload);
      expect(post.isPublic).toBe(false);
    });
    it('isPublicの値はpayload.isPublicと同一である', async () => {
      const { post } = await savePost({
        ...payload,
        isPublic: true,
      });
      expect(post.isPublic).toBe(true);
    });
    it('isDeletedのデフォルト値はfalseである', async () => {
      const { post } = await savePost(payload);
      expect(post.isDeleted).toBe(false);
    });
    it('isDeletedの値はpayload.isDeletedと同一である', async () => {
      const { post } = await savePost({
        ...payload,
        isDeleted: true,
      });
      expect(post.isDeleted).toBe(true);
    });
    it('typeのデフォルト値はlogである', async () => {
      const { post } = await savePost(payload);
      expect(post.type).toBe('log');
    });
    it('titleがcontentに<h1>title</h1>の形で含まれる', async () => {
      const title = 'Title';
      const { post } = await savePost({
        ...payload,
        title,
      });
      expect(post.content).toContain(`<h1>${title}</h1>`);
    });
  });
  describe('バリデーションエラー', () => {
    it('contentBodyが空の場合、エラーが返る', async () => {
      await expect(
        savePost({
          ...payload,
          contentBody: '',
        })
      ).rejects.toMatchObject({
        fieldErrors: {
          content: ['String must contain at least 1 character(s)']
        }
      });
    });
    it('uidが空の場合、エラーが返る', async () => {
      const rejected = await expect(
        savePost({
          contentBody: 'TEST',
        })
      ).rejects;
      rejected.toThrowError('ユーザーを指定してください');
    });
  });
  describe('サーバーエラー', () => {
    it('ユーザーが存在しない場合、エラーが返る', async () => {
      const rejected = await expect(
        savePost({
          ...payload,
          uid: 'notExist',
        })
      ).rejects;
      rejected.toThrowError('ユーザーが存在しません');
    });
  });
});
