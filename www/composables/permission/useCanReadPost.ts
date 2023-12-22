import { useMe } from "../fetch/useMe";
import { OriginalPost } from "~~/schemas/post";

const isPermitted = (post?: OriginalPost) => {
  if (!post) return false;

  const { myRef } = useMe();
  const { owner, isPublic, status } = post;
  console.log('me', owner?.path, myRef.value?.path);

  console.log('post', post);

  if (owner && myRef.value && owner?.path === myRef.value?.path) return true;
  console.log('status', status);
  console.log('isPublic', isPublic);

  return isPublic && status === 'published';
}

export const useCanReadPost = (post?: OriginalPost) => {
  const canReadPost = ref(false);

  canReadPost.value = isPermitted(post);

  return {
    canReadPost,
  };
}