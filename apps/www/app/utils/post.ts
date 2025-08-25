import type { Post } from '@rippingyard/schemas';

export const sortPosts = (items: Post[]) => {
  items.sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
  return items;
};

export const PostStatusLabel: Record<string, string> = {
  published: '公開済',
  drafted: '非公開',
};

export const PostTypeLabel: Record<string, string> = {
  article: '記事',
  note: 'ノート',
  log: '記録',
};
