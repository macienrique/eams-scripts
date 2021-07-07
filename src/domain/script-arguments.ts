/* eslint-disable @typescript-eslint/naming-convention */
export enum ScriptArguments {
  Start = 'start',
  Build = 'build',
  Test = 'test',
  Check = 'check',
  Format = 'format',
  Prettier = 'prettier',
  Husky = 'husky',
  Setup = 'setup',
}

export enum Environments {
  Local = 'local',
  Development = 'int',
  UAT_DF = 'uat-df',
  UAT_TI = 'uat-ti',
  Production = 'prod',
}

const { Local, Development, UAT_DF, UAT_TI, Production } = Environments;
export const isCorrectEnvironment = (env: Environments) => [Local, Development, UAT_DF, UAT_TI, Production].includes(env);
