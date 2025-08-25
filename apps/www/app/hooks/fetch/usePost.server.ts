import { getMe } from '~/middlewares/session.server';
import type { Post } from '@rippingyard/schemas';

import { useDoc } from '../firestore/useDoc.server';
import { useCanEditPost } from '../permission/useCanEditPost.server';

const empty = {
  post: null,
};

export const usePost = async (id: string, request: Request) => {
  const canEditPost = useCanEditPost();
  const post = await useDoc<Post>({
    collection: 'posts',
    id,
  });

  if (!post) return empty;

  if (post.isDeleted) return empty;

  if (post.status !== 'published' || !post.isPublic) {
    const { uid, role } = await getMe(request);
    if (!canEditPost(uid, role, post)) return empty;
  }

  return { post };
};
