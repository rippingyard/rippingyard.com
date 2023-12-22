import dayjs from 'dayjs';
import { Entity, OriginalEntity } from '~/schemas/entity';
import { getThumbnailFromText, hasThumbnailFromText, removeTitle } from '~~/utils/typography';
import { numberByString } from '~~/utils';
import { useEntityLink } from '../link/useEntityLink';

export const useNormalizeEntity = (originalEntity: OriginalEntity) => {

  const title = ref('');

  watchEffect(() => {
    title.value = originalEntity?.name || originalEntity.id!;
  });

  const normalizedEntity = ref<Entity>({
    ...originalEntity,
    title: title.value,
    description: originalEntity.description,
    contentBody: contentBody(originalEntity),
    hasThumbnail: hasThumbnail(originalEntity),
    autoCode: numberByString(originalEntity.id),
    thumbnail: thumbnail(originalEntity),
    permalink: permalink(originalEntity),
    sociallink: sociallink(originalEntity),
    // editlink: editlink(originalEntity),
    editlink: '',
    createdDate: dayjs(originalEntity.createdAt.toDate()),
    updatedDate: dayjs(originalEntity.updatedAt.toDate()),
  });

  return { entity: normalizedEntity, title };
}

const permalink = (entity: OriginalEntity): string => useEntityLink(entity);
const sociallink = (entity: OriginalEntity): string => useEntityLink(entity, true);

// const editlink = (entity: Partial<Entity>): string => usePostEditLink(entity);

const contentBody = (entity: Partial<Entity>): string => {
  return entity?.description ? removeTitle(entity.description) : '';
}

const hasThumbnail = (entity: OriginalEntity): boolean => hasThumbnailFromText(entity.description);

export const thumbnail = (entity: OriginalEntity): string => {
  const thumbnailFromText = getThumbnailFromText(entity?.description);
  if (thumbnailFromText) return thumbnailFromText;

  // if (post?.parent?.thumbnailImage) return post.parent.thumbnailImage;

  return '';
}

