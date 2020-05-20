const pkg = require('./package')

require('dotenv').config()

module.exports = {
  mode: 'universal',

  env: {
    FIREBASE_CONFIG: {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.FIREBASE_DATABASEURL,
      projectId: process.env.FIREBASE_PROJECTID,
      storageBucket: process.env.FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGESENDERID,
      appId: process.env.FIREBASE_APPID,
      measurementId: process.env.FIREBASE_MEASUREMENTID,
    }
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'ripping yard',
    titleTemplate: (titleChunk) => {
      return titleChunk && titleChunk !== 'ripping yard' ? `${titleChunk} - ripping yard` : 'ripping yard - 速くて小さな寄る辺なきメディア'
    },
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'description',
        name: 'description',
        content: '隣の庭をのぞきこめ！リッピング・ヤードは種を撒くようにあらゆる事柄を紹介していく、寄る辺なき小さなメディアです。'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'ripping yard - 速くて小さな寄る辺なきメディア'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '隣の庭をのぞきこめ！リッピング・ヤードは種を撒くようにあらゆる事柄を紹介していく、寄る辺なき小さなメディアです。'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://www.rippingyard.com'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'ripping yard'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://www.rippingyard.com/img/ogimage.png'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content:
          'ripping yard - 速くて小さな寄る辺なきメディア'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          '隣の庭をのぞきこめ！リッピング・ヤードは種を撒くようにあらゆる事柄を紹介していく、寄る辺なき小さなメディアです。'
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://www.rippingyard.com'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://www.rippingyard.com/img/ogimage.png'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    // '@fortawesome/fontawesome-free',
    // '@fortawesome/fontawesome-free/css/fontawesome.min.css',
    // '@fortawesome/fontawesome-free/css/fa-regular.css',
    // '@fortawesome/fontawesome-free/css/fa-solid.css',
    '~/assets/scss/app.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/utils',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/style-resources',
    '@nuxtjs/sentry',
    '@nuxtjs/gtm',
    'nuxt-svg-loader',
    ['@nuxtjs/google-adsense', {
      id: process.env.GA_ADSENSE_ID,
      pageLevelAds: true,
      // analyticsUacct: process.env.GA_TRACKING_ID,
      // analyticsDomainName: domain
    }],
    ['nuxt-vuex-localstorage', {
      localStorage: ['auth'],
      // sessionStorage: ['sfoo', 'sbar']
    }]
  ],

  // buildModules: [
  //   '@nuxtjs/gtm'
  // ],

  // gtm: { id: 'GTM-5B3N3TX', pageTracking: true },

  styleResources: {
    scss: [
      './assets/scss/variables.scss',
      './assets/scss/mixins.scss',
    ]
  },

  // jest: {
  //   setupFiles: [
  //     './jest.setup.js'
  //   ],
  // },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  sentry: { dsn: 'https://a74981ebb9e74e409341f3f74345e83a@o386699.ingest.sentry.io/5221263' },

  router: {
    middleware: ['me']
  },

  /*
   ** Build configuration
   */
  build: {

    terser: {
      terserOptions: {
        compress: { drop_console: process.env.NODE_ENV === 'production' }
      },
    },

    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
