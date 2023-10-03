import { AsyncData } from "nuxt/app";
import { OriginalEntity } from "schemas/entity";

export type Bookmark = AsyncData<OriginalEntity | null, null>;

export const useEntityFilter = (content: Ref<string | undefined>) => {

  const timer = ref<NodeJS.Timeout>();

  const urls = ref<string[]>(extractUrls(toValue(content) || ''));

  watch(content, () => {
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      if (!content.value) return;
      urls.value = extractUrls(toValue(content) || '');
    }, 5000);
  });

  return { urls };

};
