import { Post } from '~/schemas/post';

export const sortPosts = <T extends Pick<Post, 'publishedAt'> = Post>(
  items: T[]
) => {
  items.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
  return items;
};
