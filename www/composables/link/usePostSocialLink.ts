import { Post } from "~~/schemas/post";
import { useDomain } from "./useDomain";

const domain = useDomain();

export const usePostSocialLink = (post: Partial<Post>): string => `${domain}/post/${post.id}`;