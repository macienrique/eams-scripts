import { Environments } from '../../domain/script-arguments';
import build from '../build/build';
import lint from '../format/lint';
import prettier from '../format/prettier';
import test from '../test/test';

const check = () => {
  prettier(['-c', 'src']);
  lint(['"src/**/*.{js,jsx,ts,tsx}"']);
  test(['--coverage', '--ci']);
  build(Environments.Local);
};

export default check;
