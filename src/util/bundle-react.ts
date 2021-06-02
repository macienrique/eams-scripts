import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import util from 'util';

const writeFile = util.promisify(fs.writeFile);

const outputFilename = 'bundles.json';
const outputDir = 'build';

const bundleReact = async () => {
  const files = execSync(`cd ${outputDir} && find static -type f`).toString().split('\n');
  const { version } = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  const bundlesContent = {
    styles: files.filter((file: string) => file.endsWith('.css')),
    bundles: files.filter((file: string) => file.endsWith('.js')),
    version,
  };

  try {
    await writeFile(`${outputDir}/${outputFilename}`, JSON.stringify(bundlesContent));

    console.log(chalk.green('Generated:', outputFilename));
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
};

export default bundleReact;
