import { useEntity } from "~/composables/fetch/useEntity";

export const useBookmark = (url: string) => {

  console.log('url', url);

  return useEntity({
    id: encodeURI(url),
    type: 'bookmark',
  });

};