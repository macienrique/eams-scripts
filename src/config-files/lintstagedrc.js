const test = require('../commands/test/test').default;
const lint = require('../commands/lint/lint').default;
const build = require('../commands/build/build').default;

module.exports = {
  '!(*.snap)': (files) => {
    lint(['-c', ...files]);
    test(['--coverage', '--findRelatedTests', ...files]);
    build();
    process.exit(0);
  },
};
