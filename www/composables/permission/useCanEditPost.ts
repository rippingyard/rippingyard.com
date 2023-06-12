// import { useMe } from "../fetch/useMe";
import { OriginalPost } from "~~/schemas/post";
import { useMe } from "../fetch/useMe";

const isPermitted = (post?: OriginalPost) => {
  const { me } = useMe();
  console.log('owner', post?.owner?.id);
  console.log('me', me.value?.uid);
  if (!post || !post.owner) return false;
  return post.owner?.id === me.value?.uid;
}

export const useCanEditPost = (post?: OriginalPost) => {
  const canEditPost = ref(false);
  // const { me } = useMe();
  canEditPost.value = isPermitted(post);

  return {
    canEditPost,
  };
}