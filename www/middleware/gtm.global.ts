import { useGtm } from '@gtm-support/vue-gtm';

export default defineNuxtRouteMiddleware((to, from) => {
  const gtm = useGtm();
  if (!gtm) return;

  gtm.trackEvent(
    {
      event: 'nuxtRoute',
      pageType: 'PageView',
      pageUrl: to.fullPath,
    }
  );

  if (process && process?.browser) {
    gtm.trackEvent({
      event: 'config',
      page_title: document.title,
    });
  }
})