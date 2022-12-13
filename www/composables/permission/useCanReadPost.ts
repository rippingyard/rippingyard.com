// import { useMe } from "../fetch/useMe";
import { OriginalPost } from "~~/schemas/post";

const isPermitted = (post?: OriginalPost) => {
  console.log('post', post);
  if (!post) return false;
  return post.isPublic && post.status === 'published';
}

export const useCanReadPost = (post?: OriginalPost) => {
  const canReadPost = ref(false);
  // const { me } = useMe();
  canReadPost.value = isPermitted(post);

  return {
    canReadPost,
  };
}