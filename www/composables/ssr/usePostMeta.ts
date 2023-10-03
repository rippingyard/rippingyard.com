import { useHtmlHeader } from "~~/composables/utils/useHtmlHeader";
import { usePostSocialLink } from '~~/composables/link/usePostSocialLink';
import { OriginalPost, Post } from "schemas/post";

export const usePostMeta = async (postId: string, data?: Ref<OriginalPost | null>) => {
  await useAsyncData('meta-post', async () => {
    try {
      let post = data?.value || undefined;
      if (!post) post = await $fetch<OriginalPost>(`/api/post/${postId}`);

      const title = getTitle(post as Post);
      const description = getSummary(post.content);
      const permalink = usePostSocialLink(post);

      const thumbnail = getThumbnailFromText(post?.content);

      useHtmlHeader({
        title,
        meta: [
          {
            hid: 'og:title',
            property: 'og:title',
            content: title,
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: title,
          },
          {
            hid: 'description',
            name: 'description',
            content: description,
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: description,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: description,
          },
          {
            hid: 'og:url',
            property: 'og:url',
            content: permalink,
          },
          {
            hid: 'twitter:url',
            name: 'twitter:url',
            content: permalink,
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content:
              thumbnail || 'https://www.rippingyard.com/img/ogimage.png',
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            content:
              thumbnail || 'https://www.rippingyard.com/img/ogimage.png',
          },
        ]
      });
    } catch (e) {
      console.error(e);
    }
  });
}