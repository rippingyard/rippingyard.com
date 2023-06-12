import dayjs from 'dayjs';
import { Post, OriginalPost } from '~/schemas/post';
import { getThumbnailFromText, getTitle, hasThumbnailFromText, removeTitle } from '~/utils/typography';
import { numberByString } from '~~/utils';
import { usePostLink } from '../link/usePostLink';
import { usePostEditLink } from '../link/usePostEditLink';
import { useCachedDoc } from '../firestore/useCachedDoc';
import { Item } from '~/schemas/item';
import { useDefaultValue } from '../firestore/useDefaultValue';
import { useItem } from '../fetch/useItem';
import { isServer } from '@tanstack/vue-query';

export const useNormalizePost = (originalPost: OriginalPost) => {
  // if (!originalPost) return;

  // const { isLoading, data: parent } = originalPost.parent ? useCachedDoc<Item>({ ref: originalPost.parent }) : useDefaultValue();
  // const { isLoading, data: parent } = useCachedDoc<Item>({ ref: originalPost.parent });
  const { isLoading, data: parent } = useItem({ ref: originalPost.parent });
  // const { isLoading, data: parent } = useItem(originalPost?.parent?.id || '');
  // const ppp = useItem('Uec5e3usoskEwzSjSHTw');

  // const title = computed(() => {
  //   console.log('isLoading.value', isLoading.value, isRef(isLoading));
  //   console.log('originalPost.parent', originalPost.parent?.id);
  //   if (!originalPost.parent || isLoading.value || !parent.value) return getTitle(originalPost);
  //   console.log('parent', parent.value);
  //   // return parent.value?.name?.ja || getTitle(originalPost);
  //   return parent.value?.name?.ja || '読めなかった';
  // });

  // const title = computed(() => {
  //   console.log('title', parent.value?.name?.ja || getTitle(originalPost))
  //   // if (isServer) return 'サーバー';
  //   return parent.value?.name?.ja || getTitle(originalPost);
  // });

  const title = ref('');

  watchEffect(() => {
    console.log('parent.value?.name?.ja', parent.value?.name?.ja);
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

