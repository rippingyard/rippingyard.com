const pkg = require('./package')

require('dotenv').config()

module.exports = {
  mode: 'universal',
  // mode: 'spa',

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
      console.log(titleChunk)
      return titleChunk && titleChunk !== 'ripping yard' ? `${titleChunk} - ripping yard` : 'ripping yard - 速くて小さな寄る辺なきメディア'
    },
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '隣の庭をのぞきこめ！リッピング・ヤードは種を撒くようにあらゆる事柄を紹介していく、寄る辺なき小さなメディアです。' }
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
    'nuxt-svg-loader',
    ['nuxt-vuex-localstorage', {
      localStorage: ['auth'],
      // sessionStorage: ['sfoo', 'sbar']
    }]
  ],

  styleResources: {
    scss: [
      './assets/scss/variables.scss',
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

  router: {
    middleware: 'me'
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
