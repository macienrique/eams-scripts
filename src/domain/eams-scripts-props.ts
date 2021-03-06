/* eslint-disable no-template-curly-in-string */
export const EAMS_SCRIPTS_PROPS = {
  preinstall: 'export SASS_BINARY_DIR=${PWD}/npm-packages-offline-cache || set SASS_BINARY_DIR=${PWD}/npm-packages-offline-cache',
  start: 'eams-scripts start',
  'build:local': 'eams-scripts build local',
  'build:int': 'eams-scripts build int',
  'build:uat-df': 'eams-scripts build uat-df',
  'build:uat-ti': 'eams-scripts build uat-ti',
  'build:prod': 'eams-scripts build prod',
  check: 'eams-scripts check',
  format: 'eams-scripts format',
  prettier: 'eams-scripts prettier',
  test: 'eams-scripts test',
  'test:coverage': 'eams-scripts test --coverage',
  'eams:setup': 'eams-scripts setup',
};
