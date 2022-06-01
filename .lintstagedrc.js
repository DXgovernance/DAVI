module.exports = {
  'src/**/*.{js,jsx,ts,tsx,json}': ['yarn run format'],
  'src/**/*.{js,jsx,ts,tsx}': [
    'yarn run lint --fix',
    'yarn run test --bail --findRelatedTests',
  ],
};

