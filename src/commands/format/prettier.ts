import spawn from 'cross-spawn';
import path from 'path';
import { redConsole } from '../../util/chalk-console';
import getCommandBinPath from '../../util/get-command';

const prettier = (commands: string[]) => {
  const prettierConfigPath = path.join(__dirname, '../../config-files/prettierrc.js');
  const prettierBinPath = getCommandBinPath('prettier');

  const prettierProcess = spawn.sync(prettierBinPath, ['--config', prettierConfigPath, ...commands], {
    stdio: 'inherit',
    shell: true,
  });

  if (prettierProcess.status && prettierProcess.status > 0) {
    redConsole('Prettier process failed, please run "eams-scripts format" to try and fix all the errors or fix them manually.');
    process.exit(prettierProcess.status);
  }
};

export default prettier;
