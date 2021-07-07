module.exports = {
  '*.{css,scss,md,html,json}': ['npm run prettier'],
  '*.{js,jsx,ts,tsx}': ['npm run format', 'npm run test:coverage -- --ci'],
};
