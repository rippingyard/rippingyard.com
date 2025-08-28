import { isSuperUser, isAnonymous } from '~/utils/permission';

import type { Role } from '@rippingyard/schemas';

const canCreatePost = (role: Role) => {
  if (isSuperUser(role)) return true;
  if (isAnonymous(role)) return false;
  return role !== 'stranger';
};

export const useCanCreatePost = () => canCreatePost;
