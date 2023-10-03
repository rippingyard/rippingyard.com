import { useEntityId } from "~~/composables/utils/useEntityId";
import { useEntity } from "~/composables/fetch/useEntity";

export const useBookmark = (url: string) => {

  return useEntity({
    id: useEntityId(encodeURIComponent(url), 'bookmark'),
    type: 'bookmark',
  });

};