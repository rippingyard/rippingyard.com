import type { Post, Role } from '@rippingyard/schemas';
import { isAnonymous, isSuperUser } from '~/utils/permission';

import { useDocReference } from '../firestore/useDocReference.server';

const canEditPost = (uid: string | null, role: Role, post: Post) => {
  if (!uid) return false;
  if (isSuperUser(role)) return true;
  if (isAnonymous(role)) return false;

  const userDoc = useDocReference(uid, 'users');

  return userDoc && post.owner?.id === userDoc.id;
};

export const useCanEditPost = () => canEditPost;
