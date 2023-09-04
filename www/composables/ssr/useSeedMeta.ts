import { useHtmlHeader } from "~~/composables/utils/useHtmlHeader";
import { useSeedSocialLink } from "~~/composables/link/useSeedSocialLink";

export const useSeedMeta = async (postId: string) => {
  await useAsyncData('meta-seed', async () => {
    if (!process.server) return;

    try {
      const seed = await $fetch(`/api/seed/${postId}`);

      const title = seed?.title || '';
      const body = seed?.body || '';
      const description = getSummary(body);
      const permalink = useSeedSocialLink(seed);
      const thumbnail = getThumbnailFromText(body);

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