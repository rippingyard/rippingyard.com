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
    // 'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'no-console': 'off',
    'vue/no-v-html': 'off',
    'prettier/prettier': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/first-attribute-linebreak': 'off',
  },
}
