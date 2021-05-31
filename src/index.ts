#!/usr/bin/env node

import build from './commands/build/build';
import { Environments, ScriptArguments } from './domain/script-arguments';

const [nodeEngine, , ...scriptParams] = process.argv;

const instruction: ScriptArguments = scriptParams[0] as ScriptArguments;
console.log('scripts', scriptParams);

switch (instruction) {
  case ScriptArguments.Start:
    console.log('starting', instruction);
    break;
  case ScriptArguments.Build:
    const environment = scriptParams[1] as Environments;
    build(environment);
    console.log('building', instruction);
    break;
  case ScriptArguments.Test:
    console.log('testing', instruction);
    break;
  default:
    console.log('omg wrong argument', instruction);
}

console.log('node', nodeEngine);
console.log('khal drogo args', scriptParams);
console.log('cwd', process.cwd());
