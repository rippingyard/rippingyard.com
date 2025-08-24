import { Role } from '@rippingyard/schemas';
import { isSuperUser, isAnonymous } from '~/utils/permission';

const canCreatePost = (role: Role) => {
  if (isSuperUser(role)) return true;
  if (isAnonymous(role)) return false;
  return role !== 'stranger';
};

export const useCanCreatePost = () => canCreatePost;
