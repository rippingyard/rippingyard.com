import { Post } from "~~/schemas/post";

export const usePostEditLink = (post: Partial<Post>): string => `/post/${post.id}/edit`;