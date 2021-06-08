module.exports = {
  '!(*.snap)': ['npm run lint', 'npm run test:coverage', 'npm run build:local'],
};
