const fetchUrl = async (url: string) => {
  try {
    const cacheKey = `fetch-url-${encodeURIComponent(url)}`;

    return await useAsyncData(cacheKey, async () => await $fetch('/api/url/fetch', {
      params: {
        url
      }
    }));
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const useUrl = () => (url: string) => fetchUrl(url);
