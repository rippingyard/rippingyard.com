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
    [
      '@nuxtjs/google-adsense',
      {
        id: process.env.VITE_GA_ADSENSE_ID,
        test: process.env.NODE_ENV !== 'production',
        // pageLevelAds: true,
        // analyticsUacct: import.meta.env.GA_TRACKING_ID,
        // analyticsDomainName: domain
      },
    ],
    // '@tanstack/vue-query',
  ],
  buildModules: [
    '@nuxtjs/style-resources',
  ],
  app: {
    head: {
      title: 'ripping yard',
      // titleTemplate: titleChunk => {
      //   return titleChunk && titleChunk !== 'ripping yard'
      //     ? `${titleChunk} - ripping yard`
      //     : 'ripping yard - 速くて小さな寄る辺なきメディア'
      // },
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'description',
          name: 'description',
          content:
            '隣の庭をのぞきこめ！リッピング・ヤードは種を撒くようにあらゆる事柄を紹介していく、寄る辺なき小さなメディアです。',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'ripping yard - 速くて小さな寄る辺なきメディア',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            '隣の庭をのぞきこめ！リッピング・ヤードは種を撒くようにあらゆる事柄を紹介していく、寄る辺なき小さなメディアです。',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://www.rippingyard.com',
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'ripping yard',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://www.rippingyard.com/img/ogimage.png',
        },
        {
          hid: 'fb:app_id',
          property: 'fb:app_id',
          content: '374907709233344',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'ripping yard - 速くて小さな寄る辺なきメディア',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            '隣の庭をのぞきこめ！リッピング・ヤードは種を撒くようにあらゆる事柄を紹介していく、寄る辺なき小さなメディアです。',
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: 'https://www.rippingyard.com',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://www.rippingyard.com/img/ogimage.png',
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;900&family=Ultra&display=swap',
        },
      ],
    },
  },
  css: ['destyle.css'],
  build: {
    transpile: [
      'vue-query',
      'vue-demi',
      '@vuepic/vue-datepicker'
    ],
  },
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
