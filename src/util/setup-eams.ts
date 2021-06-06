import fs from 'fs';
import path from 'path';
import util from 'util';
import lint from '../commands/lint/lint';
import { EAMS_SCRIPTS_PROPS } from '../domain/eams-scripts-props';
import { TS_CONFIG_PROPS } from '../domain/tsconfig-props';
import { greenConsole, redConsole } from './chalk-console';

const writeFile = util.promisify(fs.writeFile);

const setupEAMS = async () => {
  const localPackageJSONPath = path.resolve(process.cwd(), 'package.json');
  const localPackageJSON = JSON.parse(fs.readFileSync(localPackageJSONPath, 'utf-8'));
  const updatedPackageJSON = { ...localPackageJSON, scripts: { ...localPackageJSON.scripts, ...EAMS_SCRIPTS_PROPS } };

  const localTSConfigPath = path.resolve(process.cwd(), 'tsconfig.json');
  const localTSConfig = JSON.parse(fs.readFileSync(localTSConfigPath, 'utf-8'));
  const updatedTSConfig = { ...localTSConfig, compilerOptions: { ...localTSConfig.compilerOptions, ...TS_CONFIG_PROPS } };

  try {
    await writeFile('package.json', JSON.stringify(updatedPackageJSON));
    await writeFile('tsconfig.json', JSON.stringify(updatedTSConfig));
    lint(['-w', 'package.json tsconfig.json']);

    greenConsole("Praise the sun! Your package JSON and TSConfig is setup with EAMS scripts! You're good to go!");
  } catch (err) {
    redConsole('Dinkleberg! Something went wrong setting up your EAMS scripts');
  }
};

export default setupEAMS;
