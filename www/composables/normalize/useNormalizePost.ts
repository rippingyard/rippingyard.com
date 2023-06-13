import dayjs from 'dayjs';
import { Post, OriginalPost } from '~/schemas/post';
import { getThumbnailFromText, getTitle, hasThumbnailFromText, removeTitle } from '~/utils/typography';
import { numberByString } from '~~/utils';
import { usePostLink } from '../link/usePostLink';
import { usePostEditLink } from '../link/usePostEditLink';
import { useItem } from '../fetch/useItem';

export const useNormalizePost = (originalPost: OriginalPost) => {
  // if (!originalPost) return;

  const { data: parent } = useItem({ ref: originalPost?.parent });

  const title = ref('');

  watchEffect(() => {
    title.value = parent.value?.name?.ja || getTitle(originalPost);
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
    editlink: editlink(originalPost),
    sociallink: '/',
    createdDate: dayjs(originalPost.createdAt.toDate()),
    updatedDate: dayjs(originalPost.updatedAt.toDate()),
    publishedDate: dayjs(originalPost.publishedAt.toDate()),
  });

  return { post: normalizedPost, title };
}

const permalink = (post: Partial<Post>): string => usePostLink(post);

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

