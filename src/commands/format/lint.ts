import spawn from 'cross-spawn';
import path from 'path';
import { redConsole } from '../../util/chalk-console';
import getCommandBinPath from '../../util/get-command';

const lint = (commands: string[]) => {
  const eslintConfigPath = path.join(__dirname, '../../config-files/eslintrc.js');
  const eslintBinPath = getCommandBinPath('eslint');
  commands.push('--ignore-pattern', '"*.json"');
  commands.push('--ignore-pattern', '"*.snap"');

  const lintProcess = spawn.sync(eslintBinPath, ['--no-eslintrc', '-c', eslintConfigPath, ...commands], {
    stdio: 'inherit',
    shell: true,
  });

  if (lintProcess.status && lintProcess.status > 0) {
    redConsole('ESLint process failed, please run "eams-scripts format" to try and fix all the errors or fix them manually.');
    process.exit(lintProcess.status);
  }
};

export default lint;
