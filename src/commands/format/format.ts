import lint from './lint';
import prettier from './prettier';

const format = (commands: string[]) => {
  lint(['--fix', '"src/**/*/*.{js,jsx,ts,tsx}"', ...commands]);
  prettier(['-w', 'src', ...commands]);
};

export default format;
