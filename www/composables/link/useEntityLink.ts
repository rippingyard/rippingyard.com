import { useRemoveEntityPrefix } from "~~/composables/utils/useRemoveEntityPrefix";
import { useDomain } from "./useDomain";
import { Entity, OriginalEntity } from "~~/schemas/entity";

const domain = useDomain();

export const useEntityLink = (entity: OriginalEntity | Entity, isFullpath = false): string => {
  const id = useRemoveEntityPrefix(entity.id, entity.type);
  switch(entity.type) {
    case 'bookmark':
      return `${isFullpath ? domain : ''}/bookmark/${id}`;
    case 'genre':
      return `${isFullpath ? domain : ''}/${id}`;
    case 'tag':
    default:
      return `${isFullpath ? domain : ''}/tag/${id}`;
  }
};