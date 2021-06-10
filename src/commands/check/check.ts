import prettier from '../../commands/format/prettier';
import { Environments } from '../../domain/script-arguments';
import build from '../build/build';
import lint from '../format/lint';
import test from '../test/test';

const check = () => {
  prettier(['-c', 'src']);
  lint(['"src/**/*.{js,jsx,ts,tsx}"']);
  test(['--coverage']);
  build(Environments.Local);
};

export default check;
