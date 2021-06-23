#!/usr/bin/env node

import build from './commands/build/build';
import check from './commands/check/check';
import format from './commands/format/format';
import husky from './commands/husky/husky';
import setup from './commands/setup/setup';
import start from './commands/start/start';
import test from './commands/test/test';
import { Environments, ScriptArguments } from './domain/script-arguments';
import { blueConsole, greenConsole, redConsole } from './util/chalk-console';

const [, , ...scriptParams] = process.argv;

const [instruction, ...argParams] = scriptParams;

blueConsole(`You're running: eams-scripts ${instruction}\n`);
if (argParams.length > 0) {
  greenConsole('With params:');
  argParams.forEach((param) => {
    greenConsole(`- ${param}`);
  });
}

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
  case ScriptArguments.Format:
    format(argParams.length === 0 ? ['"src"'] : argParams);
    break;
  case ScriptArguments.Husky:
    husky();
    break;
  case ScriptArguments.Setup:
    setup();
    break;
  default:
    redConsole(`Wrong argument: ${instruction}`);
    process.exit(1);
}

process.exit(0);
