import type { User } from '@rippingyard/schemas';

import { useDoc } from '../firestore/useDoc.server';

export const useUser = async (id: string) => {
  // IDが空または無効な場合はnullを返す
  if (!id || id.trim() === '') {
    return { user: null };
  }
  
  const user = await useDoc<User>({
    collection: 'users',
    id,
  });
  return { user };
};
