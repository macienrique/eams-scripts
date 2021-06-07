import spawn from 'cross-spawn';
import path from 'path';
import getCommandBinPath from '../../util/get-command';
import handleProcess from '../../util/handle-process';

const husky = () => {
  const lintStagedBinPath = getCommandBinPath('lint-staged');
  const localLintStagedConfigPath = path.join(__dirname, '../../config-files/lintstagedrc');

  const lintStagedProcess = spawn.sync(lintStagedBinPath, ['--config', localLintStagedConfigPath], {
    stdio: 'inherit',
    shell: true,
  });
  handleProcess('HUSKY', lintStagedProcess);
};

export default husky;
