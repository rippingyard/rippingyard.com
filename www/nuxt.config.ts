// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  ssr: true,
  dirs: [
    {
      "path": "~/components/atoms",
      "global": true
    },
    "~/components"
  ],
  modules: [
    '@vueuse/nuxt',
    // '@vueuse/firebase',
  ],
  buildModules: [
    '@nuxtjs/style-resources',
  ],
  // css: ['@/assets/scss/app.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/app.scss";',
        },
      },
    },
  },
})
