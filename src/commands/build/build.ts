import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import { Environments, isCorrectEnvironment } from '../../domain/script-arguments';
import bundleReact from '../../util/bundle-react';
import { redConsole } from '../../util/chalk-console';
import compress from '../../util/compress';
import getCommandBinPath from '../../util/get-command';
import handleProcess from '../../util/handle-process';

const reactScripts = 'react-scripts';

const build = (environment = Environments.Local) => {
  if (!isCorrectEnvironment(environment)) {
    redConsole(`\n[ERROR]: Incorrect environment: ${environment}`);
    process.exit(1);
  }

  const localPackageJSONPath = path.resolve(process.cwd(), 'package.json');
  const localPackageJSON = JSON.parse(fs.readFileSync(localPackageJSONPath, 'utf-8'));
  const { dependencies, devDependencies } = localPackageJSON;

  const hasReactScripts = Boolean(dependencies[reactScripts] || devDependencies[reactScripts]);

  if (hasReactScripts) {
    const reactScriptsBinPath = getCommandBinPath(reactScripts);
    const dotenvBinPath = getCommandBinPath('dotenv');
    const crossEnvBinPath = getCommandBinPath('cross-env');
    const rimrafBinPath = getCommandBinPath('rimraf');
    const shouldGenSourceMap = environment !== Environments.Production;
    const shouldCleanModules = environment !== Environments.Local;
    const envFilename = environment === Environments.Local ? '.env' : `.env.${environment}`;

    if (shouldCleanModules) {
      const preBuild = spawn.sync('npm ci', {
        stdio: 'inherit',
        shell: true,
      });
      handleProcess('Running npm ci', preBuild);
    }

    const buildCommand = `${crossEnvBinPath} GENERATE_SOURCEMAP=${shouldGenSourceMap} ${dotenvBinPath} -e ${envFilename} ${reactScriptsBinPath} build`;
    const buildProcess = spawn.sync(buildCommand, {
      stdio: 'inherit',
      shell: true,
    });
    handleProcess(`Running eams-scripts build ${environment}`, buildProcess);

    const postBuild = spawn.sync(`${rimrafBinPath} build/index.html build/asset-manifest.json`, {
      stdio: 'inherit',
      shell: true,
    });
    handleProcess(`Running eams-scripts build ${environment}`, postBuild);

    if (environment !== Environments.Local) {
      bundleReact();
      compress();
    }
  }
};

export default build;
