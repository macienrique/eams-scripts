#!/usr/bin/env node

import build from './commands/build/build';
import check from './commands/check/check';
import husky from './commands/husky/husky';
import lint from './commands/lint/lint';
import start from './commands/start/start';
import test from './commands/test/test';
import { Environments, ScriptArguments } from './domain/script-arguments';
import { greenConsole, redConsole } from './util/chalk-console';
import setupEAMS from './util/setup-eams';

const [, , ...scriptParams] = process.argv;

const [instruction, ...argParams] = scriptParams;

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
      build(scriptParams[1] as Environments);
      break;
    case ScriptArguments.Test:
      test(argParams);
      break;
    case ScriptArguments.Check:
      check();
      break;
    case ScriptArguments.Lint:
      lint(argParams);
      break;
    case ScriptArguments.Husky:
      husky();
      break;
    default:
      redConsole(`Wrong argument: ${instruction}`);
      process.exit(1);
  }

  process.exit(0);
});
