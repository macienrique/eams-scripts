#!/usr/bin/env node

import build from './commands/build/build';
import check from './commands/check/check';
import lint from './commands/lint/lint';
import start from './commands/start/start';
import test from './commands/test/test';
import { Environments, ScriptArguments } from './domain/script-arguments';
import { greenConsole, redConsole } from './util/chalk-console';
import setupEAMS from './util/setup-eams';

const [, , ...scriptParams] = process.argv;

const [instruction, ...argParams] = scriptParams;
console.log('scripts', scriptParams);

greenConsole(`You're running: eams-scripts ${instruction}`);
if (argParams.length > 0) {
  greenConsole(`With params: ${argParams}`);
}

setupEAMS().then(() => {
  switch (instruction) {
    case ScriptArguments.Start:
      start();
      break;
    case ScriptArguments.Build:
      const environment = scriptParams[1] as Environments;
      build(environment);
      break;
    case ScriptArguments.Test:
      test(argParams);
      break;
    case ScriptArguments.Check:
      check();
      break;
    case ScriptArguments.Lint:
      lint(['-w', 'src']);
      break;
    default:
      redConsole(`Wrong argument: ${instruction}`);
  }
});
