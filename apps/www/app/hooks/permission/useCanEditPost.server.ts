import { isAnonymous, isSuperUser } from '~/utils/permission';
import { getDocumentReferenceId } from '~/utils/sanitizeFirestoreData';

import type { Post, Role } from '@rippingyard/schemas';

import { useDocReference } from '../firestore/useDocReference.server';

const canEditPost = (uid: string | null, role: Role, post: Post) => {
  if (!uid) return false;
  if (isSuperUser(role)) return true;
  if (isAnonymous(role)) return false;

  const userDoc = useDocReference(uid, 'users');

  const ownerId = getDocumentReferenceId(post.owner);
  return userDoc && ownerId === userDoc.id;
};

export const useCanEditPost = () => canEditPost;
