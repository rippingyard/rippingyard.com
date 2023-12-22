export const useErrorNotFound = (message: string = 'この記事は未公開です') => {
  const { $openToast: openToast, $me: me } = useNuxtApp();

  openToast(message);
  // isNotFound.value = true;
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}