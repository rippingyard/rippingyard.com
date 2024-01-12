﻿import { Post } from '~/schemas/post';

import { useDoc } from '../firestore/useDoc';

export const usePost = async (id: string) => {
  const post = await useDoc<Post>({
    collection: 'posts',
    id,
  });
  return { post };
};
