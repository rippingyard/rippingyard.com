import { OriginalEntity } from "~~/schemas/entity";

const isPermitted = (entity?: OriginalEntity) => {
  if (!entity) return false;

  const { status, isDeleted } = entity;

  console.log('entity', entity);

  return !isDeleted && status === 'published';
}

export const useCanReadEntity = (entity?: OriginalEntity) => {
  const canReadEntity = ref(false);

  canReadEntity.value = isPermitted(entity);

  return {
    canReadEntity,
  };
}