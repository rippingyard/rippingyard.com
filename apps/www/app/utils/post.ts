import type { Post } from '@rippingyard/schemas';

export const sortPosts = (items: Post[]) => {
  items.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
  return items;
};

export const PostStatusLabel: Record<string, string> = {
  published: 'post.statusLabel.published',
  drafted: 'post.statusLabel.drafted',
};

export const PostTypeLabel: Record<string, string> = {
  article: 'post.typeLabel.article',
  note: 'post.typeLabel.note',
  log: 'post.typeLabel.log',
};
