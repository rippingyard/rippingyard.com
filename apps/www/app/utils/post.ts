import { Post } from '~/schemas/post';

export const sortPosts = (items: Post[]) => {
  items.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
  return items;
};
