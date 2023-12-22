import { useHtmlHeader } from "~~/composables/utils/useHtmlHeader";
import { OriginalEntity } from "~~/schemas/entity";
import { useEntityLink } from "~~/composables/link/useEntityLink";

export const useEntityMeta = async (entityId: string, data?: Ref<OriginalEntity | null>) => {
  console.log('useEntityMeta', entityId);
  await useAsyncData(`meta-entity-${entityId}`, async () => {
    try {
      let entity = data?.value || undefined;
      if (!entity) entity = await $fetch<OriginalEntity>(`/api/entity/${entityId}`);

      // const title = getTitle(entity as Entity);
      const title = entity?.name || entity.id!;
      const description = getSummary(entity.description);
      const permalink = useEntityLink(entity, true);

      const thumbnail = getThumbnailFromText(entity?.description);

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