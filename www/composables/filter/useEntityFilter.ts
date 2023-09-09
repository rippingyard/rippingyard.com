import { useBookmark } from "~/composables/fetch/useBookmark";

export const useEntityFilter = (content: Ref<string | undefined>) => {

  if (!content.value) return;

  const urls = computed(() => extractUrls(toValue(content) || ''));
  const result = ref<any>();

  const getUrls = (urls: Ref<string[]>) => {
    console.log('urls', urls.value);
    if (urls.value.length === 0) return;
    return urls.value.map(url => useBookmark(url));
  }

  // watch(urls, () => {
  //   console.log('urls', urls.value);
  // })

  result.value = getUrls(urls);

};
