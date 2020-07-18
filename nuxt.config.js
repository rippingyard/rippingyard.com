// const pkg = require('./package')

// const db = require('./plugins/firebase')
// const normalize = require('./store/post')

const axios = require('axios')

require('dotenv').config()

let fbconfig_env = process.env.FIREBASE_CONFIG
if( fbconfig_env ) fbconfig_env = JSON.parse(fbconfig_env)

const firebase_config = fbconfig_env || require('./env.json')

const firebase_api = `https://firestore.googleapis.com/v1/projects/${firebase_config.projectId}/databases/(default)/documents/`

// console.log(firebase_api)

module.exports = {
  // mode: 'spa',
  mode: 'universal',

  env: {
    NODE_ENV: process.env.NODE_ENV,
    FIREBASE_CONFIG: firebase_config,
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
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '374907709233344'
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href:"https://use.fontawesome.com/releases/v5.6.1/css/all.css"}
    ]
    
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    // '@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/scss/app.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/gtm',
    '~/plugins/utils',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    'nuxt-buefy',
    '@nuxtjs/style-resources',
    '@nuxtjs/sentry',
    '@nuxtjs/gtm',
    '@nuxtjs/sitemap',
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

  sitemap: {
    hostname: process.env.NODE_ENV !== 'production' ? 'https://rippingyard-dev.web.app/' : 'https://www.rippingyard.com/',
    lastmod: new Date(),
    path: '/sitemap.xml',
    sitemaps: [
      {
        path: '/sitemaps/static.xml',
        gzip: true,
        cacheTime: 1000 * 60 * 60 * 12,
        lastmod: new Date(1594277680502),// new Date().getTime()
        exclude: [
          '/home',
          '/home/**',
          '/signup',
          '/signup/**',
        ],
      },
      {
        path: '/sitemaps/posts.xml',
        gzip: false,
        cacheTime: 1000 * 60 * 20,
        filter ({ routes, options }) {
          return routes.filter(route => route.url.match(/^\/post\//))
        },
        routes: async () => {
          
          const permalinks = []

          const posts = await axios.get(`${firebase_api}timelines/public/posts`)

          posts.data.documents.forEach(doc => {
            permalinks.push('/post/' + doc.name.split('/').slice(-1)[0])
          })

          return permalinks
          
        }
      },
      {
        path: '/sitemaps/seeds.xml',
        gzip: true,
        lastmod: new Date(1593090856034),
        cacheTime: 1000 * 60 * 60 * 24 * 30,
        filter ({ routes, options }) {
          return routes.filter(route => route.url.match(/^\/seeds\//))
        },
        routes: () => {
          
          const permalinks = []

          const seeds = require('./assets/json/old/seeds.json')

          seeds.forEach(seed => {
            permalinks.push('/seeds/' + seed.slug)
          })

          return permalinks
          
        }
      }
    ]
  },

  generate: {
    dir: 'dist/client'
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
