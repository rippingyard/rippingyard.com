import { useMe } from "../fetch/useMe";
import { OriginalPost } from "~~/schemas/post";

const isPermitted = (post?: OriginalPost) => {
  console.log('post', post);
  if (!post) return false;

  const { myRef } = useMe();
  console.log('me', post.owner?.path, myRef.value?.path);

  if (post.owner && myRef.value && post.owner?.path === myRef.value?.path) return true;

  return post.isPublic && post.status === 'published';
}

export const useCanReadPost = (post?: OriginalPost) => {
  const canReadPost = ref(false);

  canReadPost.value = isPermitted(post);

  return {
    canReadPost,
  };
}