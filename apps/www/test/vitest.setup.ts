import { beforeAll, vi } from 'vitest';

import { mocksdk } from './mocks/useFirebase';

vi.mock('~/hooks/firestore/useFirestore.server', () => {
  return {
    useFirestore: () => mocksdk.firestore(),
  };
});

beforeAll(async () => {
  await mocksdk.firestore().collection('users').doc('user1').set({});
});
