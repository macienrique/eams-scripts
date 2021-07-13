import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import { EAMS_SCRIPTS_PROPS } from '../../domain/eams-scripts-props';
import { JEST_PROPS } from '../../domain/jest-props';
import { TS_CONFIG_PROPS } from '../../domain/tsconfig-props';
import { greenConsole, redConsole } from '../../util/chalk-console';
import getCommandBinPath from '../../util/get-command';
import handleProcess from '../../util/handle-process';
import prettier from '../prettier/prettier';

interface ObjectInterface {
  [key: string]: string;
}

const setupHusky = () => {
  const rimrafBinPath = getCommandBinPath('rimraf');

  const removeHusky = spawn.sync(`${rimrafBinPath} .husky`, {
    stdio: 'inherit',
    shell: true,
  });
  handleProcess(`Removing .husky dir`, removeHusky);

  const huskyBinPath = getCommandBinPath('husky');

  const huskyCommand = `${huskyBinPath} install && ${huskyBinPath} add .husky/pre-commit "npx eams-scripts husky" && ${huskyBinPath} add .husky/pre-commit "npm run build:local"`;
  const huskyProcess = spawn.sync(huskyCommand, {
    stdio: 'inherit',
    shell: true,
  });
  handleProcess('Setting up husky', huskyProcess);
};

const createFormattingFiles = () => {
  const eslintFileContent = "module.exports = require('eams-scripts/build/config-files/eslintrc');";
  const prettierFileContent = "module.exports = require('eams-scripts/build/config-files/prettierrc');";

  fs.writeFileSync('.eslintrc.js', eslintFileContent);
  fs.writeFileSync('.prettierrc.js', prettierFileContent);

  prettier(['-w', '.eslintrc.js', '.prettierrc.js']);
};

const setup = () => {
  const localPackageJSONPath = path.resolve(process.cwd(), 'package.json');
  const { husky, jest, ...restPackageJSON } = JSON.parse(fs.readFileSync(localPackageJSONPath, 'utf-8'));
  const eamsProps = Object.keys(EAMS_SCRIPTS_PROPS);
  const customScripts = Object.entries(restPackageJSON.scripts as ObjectInterface).reduce((acc: ObjectInterface, [name, script]) => {
    const isInEAMSProps = eamsProps.some((prop) => prop === name);
    if (!isInEAMSProps) {
      acc[name] = script;
    }

    return acc;
  }, {});

  let newJestConfig = { snapshotSerializers: JEST_PROPS.snapshotSerializers };
  if (jest) {
    newJestConfig = { ...jest, ...newJestConfig };

    if (jest.snapshotSerializers) {
      const customSerializers = jest.snapshotSerializers.filter(
        (serializer: string) => !JEST_PROPS.snapshotSerializers.includes(serializer),
      );
      const updatedSerializer = [...customSerializers, ...JEST_PROPS.snapshotSerializers];
      newJestConfig = { ...newJestConfig, snapshotSerializers: updatedSerializer };
    }
  }

  const updatedPackageJSON = {
    ...restPackageJSON,
    scripts: { ...EAMS_SCRIPTS_PROPS, ...customScripts },
    jest: newJestConfig,
  };

  const localTSConfigPath = path.resolve(process.cwd(), 'tsconfig.json');
  const localTSConfig = JSON.parse(fs.readFileSync(localTSConfigPath, 'utf-8'));
  const updatedTSConfig = {
    ...localTSConfig,
    compilerOptions: { ...localTSConfig.compilerOptions, ...TS_CONFIG_PROPS },
  };

  setupHusky();
  createFormattingFiles();

  try {
    if (JSON.stringify({ husky, ...restPackageJSON, jest }) !== JSON.stringify(updatedPackageJSON)) {
      fs.writeFileSync('package.json', JSON.stringify(updatedPackageJSON));
      prettier(['-w', 'package.json']);
      greenConsole("Praise the sun! Your package.json is setup with EAMS scripts! You're good to go!");
    }

    if (JSON.stringify(localTSConfig) !== JSON.stringify(updatedTSConfig)) {
      fs.writeFileSync('tsconfig.json', JSON.stringify(updatedTSConfig));
      prettier(['-w', 'tsconfig.json']);
      greenConsole("God almighty! Your tsconfig.json is setup with EAMS scripts! Go get 'em!");
    }
  } catch (err) {
    redConsole('Dinkleberg! Something went wrong setting up your EAMS scripts');
  }

  greenConsole('eams-scripts are all setup!');
};

export default setup;
