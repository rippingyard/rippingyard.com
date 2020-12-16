let fbconfigEnv = process.env.FIREBASE_CONFIG
if (fbconfigEnv) fbconfigEnv = JSON.parse(fbconfigEnv)

// const fbAPI = `https://firestore.googleapis.com/v1/projects/${fbConfig.projectId}/databases/(default)/documents/`

export default {
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'rippingyard.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['destyle.css', '~/assets/scss/app.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/fontawesome', { component: 'fontAwesome', suffix: true }]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources',
    // '@nuxtjs/axios',
    'nuxt-svg-loader',
    [
      '@nuxtjs/firebase',
      {
        config: fbconfigEnv || require('./env.json').FIREBASE_CONFIG,
        services: {
          auth: true,
          firestore: true,
          storage: true,
        },
      },
    ],
  ],

  fontawesome: {
    // https://fontawesome.com/icons?d=gallery&m=free
    icons: {
      solid: [],
      regular: [],
      brands: [],
    },
  },

  styleResources: {
    scss: ['./assets/scss/variables.scss', './assets/scss/mixins.scss'],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
