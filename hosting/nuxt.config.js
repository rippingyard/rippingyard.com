let fbconfigEnv = process.env.FIREBASE_CONFIG
if (fbconfigEnv) fbconfigEnv = JSON.parse(fbconfigEnv)

let algoliaEnv = process.env.ALGOLIA_CONFIG
if (algoliaEnv) algoliaEnv = JSON.parse(algoliaEnv)

// const fbAPI = `https://firestore.googleapis.com/v1/projects/${fbConfig.projectId}/databases/(default)/documents/`

export default {
  dev: process.env.NODE_ENV !== 'production',

  ssr: true,
  target: 'server',

  env: {
    NODE_ENV: process.env.NODE_ENV,
    FIRE_ENV: process.env.FIRE_ENV,
    ALGOLIA_CONFIG: algoliaEnv || require('./env.json').ALGOLIA_CONFIG,
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'ripping yard',
    titleTemplate: titleChunk => {
      return titleChunk && titleChunk !== 'ripping yard'
        ? `${titleChunk} - ripping yard`
        : 'ripping yard - 速くて小さな寄る辺なきメディア'
    },
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

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['destyle.css', '~/assets/scss/app.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/middleware/gtm', '~/plugins/auth', '~/middleware/snack'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/fontawesome', { component: 'fa', suffix: true }],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/gtm',
    // '@nuxtjs/axios',
    'nuxt-svg-loader',
    [
      '@nuxtjs/google-adsense',
      {
        id: process.env.GA_ADSENSE_ID || require('./env.json').GA_ADSENSE_ID,
        test: process.env.NODE_ENV !== 'production',
        // pageLevelAds: true,
        // analyticsUacct: process.env.GA_TRACKING_ID,
        // analyticsDomainName: domain
      },
    ],
    [
      '@nuxtjs/firebase',
      {
        config: fbconfigEnv || require('./env.json').FIREBASE_CONFIG,
        services: {
          auth:
            process.env.FIRE_ENV === 'local'
              ? {
                  emulatorPort: 9099,
                  emulatorHost: 'http://localhost',
                  disableEmulatorWarnings: true,
                }
              : true,
          firestore:
            process.env.FIRE_ENV === 'local'
              ? {
                  // enablePersistence: true,
                  emulatorPort: 8080,
                  emulatorHost: 'localhost',
                  // settings: {
                  //   host: 'localhost',
                  //   ssl: false,
                  // },
                }
              : true,
          storage: true,
        },
        // onFirebaseHosting: true,
      },
    ],
    [
      'nuxt-vuex-localstorage',
      {
        localStorage: ['auth'],
        // sessionStorage: ['sfoo', 'sbar']
      },
    ],
  ],

  gtm: {
    id: process.env.GTM_ID || 'GTM-5B3N3TX',
    enabled: true,
  },

  fontawesome: {
    // https://fontawesome.com/icons?d=gallery&m=free
    icons: {
      solid: [
        'faBold',
        'faCode',
        'faExternalLinkAlt',
        'faHeading',
        'faImage',
        'faItalic',
        'faLink',
        'faList',
        'faListOl',
        'faQuoteRight',
        'faTrashAlt',
        'faAngleRight',
        'faClock',
      ],
      regular: [],
      brands: [],
    },
  },

  styleResources: {
    scss: ['./assets/scss/variables.scss', './assets/scss/mixins.scss'],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  sentry: {
    dsn:
      'https://a74981ebb9e74e409341f3f74345e83a@o386699.ingest.sentry.io/5221263',
  },

  router: {
    middleware: ['me'],
    base: '/',
    linkExactActiveClass: 'is-current',
  },

  generate: {
    crawler: false,
    // dir: 'dist/client',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    analyze: true,

    // vender: ['moment'],
    // plugins: [
    //   new MomentLocalesPlugin({
    //     localesToKeep: ['es-us', 'ja']
    //   }),
    // ],

    terser: {
      terserOptions: {
        compress: { drop_console: process.env.NODE_ENV === 'production' },
      },
    },

    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/,
    //     })
    //   }
    // },
  },
}
