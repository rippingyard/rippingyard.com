import { useEntityId } from "~~/composables/utils/useEntityId";
import { useEntity } from "~/composables/fetch/useEntity";

export const useBookmark = (url: string | undefined) => {

  if (!url) return { pending: ref(false), data: ref(undefined), error: undefined };

  return useEntity({
    id: useEntityId(url, 'bookmark'),
    type: 'bookmark',
  });

};