import { useEntity } from "~/composables/fetch/useEntity";

export const useBookmark = (url: string) => {

  return useEntity({
    id: encodeURIComponent(url),
    type: 'bookmark',
  });

};