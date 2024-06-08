module.exports = {
  '*.{js,ts,tsx}': [
    'jest --coverage --findRelatedTests',
    'yarn lint --fix',
  ],
}
