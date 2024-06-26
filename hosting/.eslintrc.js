module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    serviceworker: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'vue/no-v-html': 'off',
    'prettier/prettier': 'off',
  },
}
