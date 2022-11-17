import { Post, OriginalPost } from '~/schemas/post';
import { getThumbnailFromText, getTitle } from '~/utils/typography';

export const useNormalizePost = (originalPost: OriginalPost): Post => {

  const post: Post = {
    ...originalPost,
    title: getTitle(originalPost),
    contentOriginal: originalPost.content,
    thumbnail: thumbnail(originalPost),
    permalink: permalink(originalPost),
    editlink: editlink(originalPost),
    sociallink: '/',
  }

  return post;
}

const permalink = (post: Partial<Post>): string => `/post/${post.id}`;

const editlink = (post: Partial<Post>): string => {
  const postType = post.type === 'log' ? 'log' : 'post'
  return `/home/${postType}/edit/${post.id}`
}

export function thumbnail(post: OriginalPost): string {
  const thumbnailFromText = getThumbnailFromText(post?.content);
  if (thumbnailFromText) return thumbnailFromText;

  if (post?.parent?.thumbnailImage) return post.parent.thumbnailImage;

  return '';
}
