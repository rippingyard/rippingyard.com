import { createGtm } from '@gtm-support/vue-gtm';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(createGtm({
    id: import.meta.env.VITE_GTM_ID as string || 'GTM-5B3N3TX',
    // defer: false,
    // compatibility: false,
    // enabled: true,
    debug: import.meta.env.VERCEL_ENV !== 'production',
    // loadScript: true,
    // vueRouter: useRouter(),
    // trackOnNextTick: false
  }));
});