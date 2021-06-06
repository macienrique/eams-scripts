import { SpawnSyncReturns } from 'child_process';
import { greenConsole, redConsole } from './chalk-console';

const randomCongrats = ['Congrats!', 'Hooray!', 'Eureka!', 'Booyah!', 'Hallelujah!', 'Praise the Sun!'];
const randomSadness = [
  'Uh oh!',
  'Booo!',
  'Dinkleberg!',
  'You have died!',
  "Ah, it looks like it's beginning to rain.",
  'Goodness Gracious!',
];

const handleProcess = (processName: string, childProcess: SpawnSyncReturns<Buffer>) => {
  if (childProcess.status && childProcess.status !== 0) {
    redConsole(
      `${randomSadness[Math.floor(randomCongrats.length * Math.random())]} ${processName} process has failed, please check the console`,
    );
    process.exit(childProcess.status);
  }

  greenConsole(`${randomCongrats[Math.floor(randomCongrats.length * Math.random())]} ${processName} process has passed!`);
};

export default handleProcess;
