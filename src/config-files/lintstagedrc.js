module.exports = {
  '!(*.snap)': ['npm run lint', 'npm run test:coverage -- --ci', 'npm run build:local'],
};
