import dayjs from 'dayjs';
import { Post, OriginalPost } from '~/schemas/post';
import { getThumbnailFromText, getTitle, hasThumbnailFromText, removeTitle } from '~/utils/typography';
import { numberByString } from '~~/utils';
import { usePostLink } from '../link/usePostLink';
import { usePostEditLink } from '../link/usePostEditLink';
import { useItem } from '../fetch/useItem';
import { usePostSocialLink } from '~~/composables/link/usePostSocialLink';

const getParent = (post: OriginalPost) => {
  if (!post.parent) return { data: undefined };
  return useItem({ ref: post?.parent });
}

export const useNormalizePost = (originalPost: OriginalPost) => {

  const { data: parent } = getParent(originalPost);

  const title = ref('');

  watchEffect(() => {
    title.value = getTitle(originalPost, parent?.value || undefined);
  });

  const normalizedPost = ref<Post>({
    ...originalPost,
    title: title.value,
    contentOriginal: originalPost.content,
    contentBody: contentBody(originalPost),
    hasThumbnail: hasThumbnail(originalPost),
    autoCode: numberByString(originalPost.id),
    thumbnail: thumbnail(originalPost),
    permalink: permalink(originalPost),
    sociallink: sociallink(originalPost),
    editlink: editlink(originalPost),
    createdDate: dayjs(originalPost.createdAt.toDate()),
    updatedDate: dayjs(originalPost.updatedAt.toDate()),
    publishedDate: dayjs(originalPost.publishedAt.toDate()),
  });

  return { post: normalizedPost, title };
}

const permalink = (post: Partial<Post>): string => usePostLink(post);
const sociallink = (post: Partial<Post>): string => usePostSocialLink(post);

const editlink = (post: Partial<Post>): string => usePostEditLink(post);

const contentBody = (post: Partial<Post>): string => {
  return post?.content ? removeTitle(post.content) : '';
}

const hasThumbnail = (post: OriginalPost): boolean => hasThumbnailFromText(post.content);

export const thumbnail = (post: OriginalPost): string => {
  const thumbnailFromText = getThumbnailFromText(post?.content);
  if (thumbnailFromText) return thumbnailFromText;

  // if (post?.parent?.thumbnailImage) return post.parent.thumbnailImage;

  return '';
}

