import prettier from '../prettier/prettier';
import lint from './lint';

const format = (commands: string[]) => {
  lint(['--fix', ...commands]);
  prettier(['-w', ...commands]);
};

export default format;
