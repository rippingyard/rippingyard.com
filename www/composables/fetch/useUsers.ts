import { QueryParams, useCachedDocs } from '../firestore/useCachedDocs';
import { User } from '~~/schemas/user';

export const useUsers = (args: Omit<QueryParams, 'collection'> = {}) => {

  const { where = [] } = args;

  return useCachedDocs<User>({
    ...args,
    collection: 'users',
    where: [
      ...where,
    ],
  });

};