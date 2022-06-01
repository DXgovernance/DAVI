module.exports = {
  'src/**/*.{ts,tsx,json}': ['yarn run format'],
  'src/**/*.{ts,tsx}': [
    'yarn run lint --fix',
    'yarn run test --bail --findRelatedTests',
  ],
};

