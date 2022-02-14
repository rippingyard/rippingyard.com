module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': null,
    'declaration-empty-line-before': null,
    'scss/at-rule-no-unknown': true,
    'no-descending-specificity': null,
    'color-hex-case': 'upper',
  },
}
