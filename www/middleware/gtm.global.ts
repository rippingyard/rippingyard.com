import { useGtm } from '@gtm-support/vue-gtm';

export default defineNuxtRouteMiddleware((to, from) => {
  const gtm = useGtm();
  if (!gtm) return;

  // TODO: レースコンディションが過ぎる…
  setTimeout(() => {
    console.log('page view: ', to.fullPath, document.title);
    gtm.trackEvent(
      {
        event: 'nuxtRoute',
        pageType: 'PageView',
        pageUrl: to.fullPath,
        pageTitle: document.title,
        routeName: document.title,
      }
    );
  }, 3000);
})