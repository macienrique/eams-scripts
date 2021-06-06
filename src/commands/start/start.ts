import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import getCommandBinPath from '../../util/get-command';
import handleProcess from '../../util/handle-process';

const reactScripts = 'react-scripts';

const start = () => {
  const localPackageJSONPath = path.resolve(process.cwd(), 'package.json');
  const localPackageJSON = JSON.parse(fs.readFileSync(localPackageJSONPath, 'utf-8'));
  const { dependencies, devDependencies } = localPackageJSON;

  const hasReactScripts = Boolean(dependencies[reactScripts] || devDependencies[reactScripts]);

  if (hasReactScripts) {
    const reactScriptsBinPath = getCommandBinPath(reactScripts);

    const startCommand = `${reactScriptsBinPath} start`;
    const startProcess = spawn.sync(startCommand, {
      stdio: 'inherit',
      shell: true,
    });
    handleProcess('START', startProcess);
  }
};

export default start;
