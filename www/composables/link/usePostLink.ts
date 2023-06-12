import { Post } from "~~/schemas/post";

export const usePostLink = (post: Partial<Post>): string => `/post/${post.id}`;