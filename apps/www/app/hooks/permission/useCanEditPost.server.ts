import { Post } from '~/schemas/post';
import { Role } from '~/schemas/user';
import { isAnonymous, isSuperUser } from '~/utils/permission';

import { useDocReference } from '../firestore/useDocReference.server';

const canEditPost = (uid: string, role: Role, post: Post) => {
  if (isSuperUser(role)) return true;
  if (isAnonymous(role)) return false;

  const userDoc = useDocReference(uid, 'users');

  return userDoc && post.owner?.id === userDoc.id;
};

export const useCanEditPost = () => canEditPost;
