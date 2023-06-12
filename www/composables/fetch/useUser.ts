import { User } from '~/schemas/user';
import { QueryParams, useCachedDoc } from '../firestore/useCachedDoc';
import { useDefaultValue } from '../firestore/useDefaultValue';

export type UserQueryParams = Omit<QueryParams, 'collection' | 'id'>;

export const useUser = (id: string | UserQueryParams, args?: UserQueryParams) => {
  if (typeof id === 'string') {
    return useCachedDoc<User>({
      ...args,
      collection: 'users',
      id,
    });
  } else {
    if (!id?.ref) return useDefaultValue<User>();
    return useCachedDoc<User>(id);
  }
};