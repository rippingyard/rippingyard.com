import { createElement } from 'react';
import { beforeAll, vi } from 'vitest';

import { mocksdk } from './mocks/useFirebase';

vi.mock('~/hooks/firestore/useFirestore.server', () => {
  return {
    useFirestore: () => mocksdk.firestore(),
  };
});

// useEmbeddingフックをモック
vi.mock('~/hooks/embedding/useEmbedding.server', () => ({
  useEmbedding: vi.fn(() => ({
    embedding: vi.fn(async () => {
      // OpenAI embeddingsの次元数（text-embedding-ada-002の場合は1536次元）
      // モックとして固定のダミー配列を返す
      return new Array(1536).fill(0.1);
    }),
  })),
}));

// useUrlContentフックをモック
vi.mock('~/hooks/fetch/useUrlContent', () => ({
  useUrlContent: vi.fn(() => ({
    isLoading: false,
    ogp: null,
  })),
}));

// React RouterのLinkコンポーネントをモック
vi.mock('react-router', () => ({
  Link: ({ children, to, ...props }: any) => {
    return createElement('a', { href: to, ...props }, children);
  },
}));

beforeAll(async () => {
  await mocksdk.firestore().collection('users').doc('user1').set({});
});
