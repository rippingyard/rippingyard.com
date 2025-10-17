import { createElement } from 'react';
import { beforeAll, vi } from 'vitest';

import { mocksdk } from './mocks/useFirebase';

vi.mock('~/hooks/firestore/useFirestore.server', () => {
  return {
    useFirestore: () => mocksdk.firestore(),
  };
});

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
