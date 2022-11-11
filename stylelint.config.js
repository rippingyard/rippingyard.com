module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-recommended-vue'],
  rules: {
    'at-rule-no-unknown': null,
    'declaration-empty-line-before': null,
    'scss/at-rule-no-unknown': true,
    'no-descending-specificity': null,
    'color-hex-case': 'upper',
  },
}
