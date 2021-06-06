import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import getCommandBinPath from '../../util/get-command';
import handleProcess from '../../util/handle-process';

const reactScripts = 'react-scripts';

const test = (args: string[] = []) => {
  const localPackageJSONPath = path.resolve(process.cwd(), 'package.json');
  const localPackageJSON = JSON.parse(fs.readFileSync(localPackageJSONPath, 'utf-8'));
  const { dependencies, devDependencies } = localPackageJSON;

  const hasReactScripts = Boolean(dependencies[reactScripts] || devDependencies[reactScripts]);

  if (hasReactScripts) {
    const reactScriptsBinPath = getCommandBinPath(reactScripts);
    const crossEnvBinPath = getCommandBinPath('cross-env');
    const filesToTest = args.filter((arg) => fs.existsSync(arg) && fs.lstatSync(arg).isFile());
    const hasCoverageInArgs = args.some((arg) => arg === '--coverage');
    const commandCI = filesToTest.length > 0 && !hasCoverageInArgs ? '' : 'CI=true ';

    if (filesToTest.length > 0 && hasCoverageInArgs) {
      const sourceFiles = filesToTest.map((testFile) => {
        const sourceFile = testFile.replace('__tests__/', '').replace('.test', '');
        if (!fs.existsSync(sourceFile)) {
          console.error(`The test file: ${testFile} does not have a corresponding source file: ${sourceFile}`);
          process.exit(1);
        }

        return sourceFile;
      });

      args.push(`--collectCoverageOnlyFrom=${sourceFiles.toString().replace(/[,]/g, ' ')}`);
    }

    const testCommand = `${crossEnvBinPath} NODE_ICU_DATA=node_modules/full-icu ${commandCI}${reactScriptsBinPath} test`;
    const testProcess = spawn.sync(testCommand, args, {
      stdio: 'inherit',
      shell: true,
    });
    handleProcess('TEST', testProcess);
  }
};

export default test;
