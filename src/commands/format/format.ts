import lint from './lint';
import prettier from './prettier';

const format = (commands: string[]) => {
  lint(['--fix', ...commands]);
  prettier(['-w', ...commands]);
};

export default format;
