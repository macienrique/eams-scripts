/* eslint-disable no-template-curly-in-string */
export const EAMS_SCRIPTS_PROPS = {
  start: 'eams-scripts start',
  'build:local': 'eams-scripts build local',
  'build:int': 'eams-scripts build int',
  'build:uat': 'eams-scripts build uat-df',
  'build:uat-ti': 'eams-scripts build uat-ti',
  'build:prod': 'eams-scripts build prod',
  check: 'eams-scripts check',
  format: 'eams-scripts format',
  test: 'eams-scripts test',
  'test:file': 'eams-scripts test',
  'test:coverage': 'eams-scripts test --coverage',
  'test:staged': 'eams-scripts-scripts test --env=jsdom --findRelatedTests',
  preinstall: 'export SASS_BINARY_DIR=${PWD}/npm-packages-offline-cache || set SASS_BINARY_DIR=${PWD}/npm-packages-offline-cache',
  'deploy:int': './deploy-int.sh',
};
