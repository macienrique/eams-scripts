module.exports = {
  '!(*.snap)': ['npm run format', 'npm run test:coverage -- --ci', 'npm run build:local'],
};
