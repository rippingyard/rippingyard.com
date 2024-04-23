import { User } from '~/schemas/user';

import { useDoc } from '../firestore/useDoc.server';

export const useUser = async (id: string) => {
  const user = await useDoc<User>({
    collection: 'users',
    id,
  });
  return { user };
};
