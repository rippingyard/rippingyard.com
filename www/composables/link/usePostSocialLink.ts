import { Post } from "~~/schemas/post";

const domain = process.env.VERCEL_ENV === 'development' ? 'https://rippingyard-qhlsnr9ds-rippingyard.vercel.app' : 'https://www.rippingyard.com'

export const usePostSocialLink = (post: Partial<Post>): string => `${domain}/post/${post.id}`;