import spawn from 'cross-spawn';
import { redConsole } from '../../util/chalk-console';
import getCommandBinPath from '../../util/get-command';

const lint = (command: string) => {
  const prettierBinPath = getCommandBinPath('prettier');
  const lintProcess = spawn.sync(prettierBinPath, [command, 'src'], {
    stdio: 'inherit',
    shell: true,
  });

  if (lintProcess.status && lintProcess.status > 0) {
    redConsole('Linting process failed, please run "eams-scripts lint" to try and fix all the errors or fix them manually.');
    process.exit(lintProcess.status);
  }
};

export default lint;
