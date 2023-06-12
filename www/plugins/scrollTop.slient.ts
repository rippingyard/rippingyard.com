export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    window.scrollTo({ left: 0, top: 0 });
  });
});