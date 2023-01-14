import dayjs from 'dayjs';
import { Post, OriginalPost } from '~/schemas/post';
import { getThumbnailFromText, getTitle, hasThumbnailFromText, removeTitle } from '~/utils/typography';
import { numberByString } from '~~/utils';
import { usePostLink } from '../link/usePostLink';

export const useNormalizePost = (originalPost: OriginalPost): Post => {
  return {
    ...originalPost,
    title: getTitle(originalPost),
    contentOriginal: originalPost.content,
    contentBody: contentBody(originalPost),
    hasThumbnail: hasThumbnail(originalPost),
    autoCode: numberByString(originalPost.id),
    thumbnail: thumbnail(originalPost),
    permalink: permalink(originalPost),
    editlink: editlink(originalPost),
    sociallink: '/',
    createdDate: dayjs(originalPost.createdAt.toDate()),
    updatedDate: dayjs(originalPost.updatedAt.toDate()),
    publishedDate: dayjs(originalPost.publishedAt.toDate()),
  };
}

const permalink = (post: Partial<Post>): string => usePostLink(post);

const editlink = (post: Partial<Post>): string => {
  const postType = post.type === 'log' ? 'log' : 'post'
  return `/home/${postType}/edit/${post.id}`
}

const contentBody = (post: Partial<Post>): string => {
  return post?.content ? removeTitle(post.content) : '';
}

const hasThumbnail = (post: OriginalPost): boolean => hasThumbnailFromText(post.content);

export const thumbnail = (post: OriginalPost): string => {
  const thumbnailFromText = getThumbnailFromText(post?.content);
  if (thumbnailFromText) return thumbnailFromText;

  if (post?.parent?.thumbnailImage) return post.parent.thumbnailImage;

  return '';
}

