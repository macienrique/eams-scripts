import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import { EAMS_SCRIPTS_PROPS } from '../../domain/eams-scripts-props';
import { TS_CONFIG_PROPS } from '../../domain/tsconfig-props';
import { greenConsole, redConsole } from '../../util/chalk-console';
import getCommandBinPath from '../../util/get-command';
import handleProcess from '../../util/handle-process';
import prettier from '../format/prettier';

interface ObjectInterface {
  [key: string]: string;
}

const setupHusky = () => {
  const huskyBinPath = getCommandBinPath('husky');

  const huskyCommand = `${huskyBinPath} install && ${huskyBinPath} add .husky/pre-commit "eams-scripts husky"`;
  const huskyProcess = spawn.sync(huskyCommand, {
    stdio: 'inherit',
    shell: true,
  });
  handleProcess('Setting up husky', huskyProcess);
};

const setup = () => {
  const localPackageJSONPath = path.resolve(process.cwd(), 'package.json');
  const { husky, ...restPackageJSON } = JSON.parse(fs.readFileSync(localPackageJSONPath, 'utf-8'));
  const eamsProps = Object.keys(EAMS_SCRIPTS_PROPS);
  const customScripts = Object.entries(restPackageJSON.scripts as ObjectInterface).reduce((acc: ObjectInterface, [name, script]) => {
    const isInEAMSProps = eamsProps.some((prop) => prop === name);
    if (!isInEAMSProps) {
      acc[name] = script;
    }

    return acc;
  }, {});
  const updatedPackageJSON = {
    ...restPackageJSON,
    scripts: { ...EAMS_SCRIPTS_PROPS, ...customScripts },
  };

  const localTSConfigPath = path.resolve(process.cwd(), 'tsconfig.json');
  const localTSConfig = JSON.parse(fs.readFileSync(localTSConfigPath, 'utf-8'));
  const updatedTSConfig = {
    ...localTSConfig,
    compilerOptions: { ...localTSConfig.compilerOptions, ...TS_CONFIG_PROPS },
  };

  if (husky) {
    setupHusky();
  }

  try {
    if (JSON.stringify({ husky, ...restPackageJSON }) !== JSON.stringify(updatedPackageJSON)) {
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