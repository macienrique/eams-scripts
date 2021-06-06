import { Environments } from '../../domain/script-arguments';
import build from '../build/build';
import lint from '../lint/lint';
import test from '../test/test';

const check = () => {
  lint(['-c', 'src']);
  test(['--coverage']);
  build(Environments.Local);
};

export default check;
