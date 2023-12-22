import { Post } from "~~/schemas/post";
import { useDomain } from "./useDomain";

const domain = useDomain();

export const usePostLink = (post: Partial<Post>, isFullpath = false): string => `${isFullpath ? domain : ''}/post/${post.id}`;