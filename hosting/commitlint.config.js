module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [0, 'always', 72],
    'type-empty': [0, 'always', 72],
  },
}
