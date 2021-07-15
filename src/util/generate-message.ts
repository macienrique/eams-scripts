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

export const generateCongrats = (processName: string) => {
  greenConsole(`\n[SUCCESS]: ${randomCongrats[Math.floor(randomCongrats.length * Math.random())]} ${processName} has passed!`);
};

export const generateSadness = (processName: string) => {
  redConsole(
    `\n[ERROR]: ${randomSadness[Math.floor(randomCongrats.length * Math.random())]} ${processName} has failed, please check the console`,
  );
};
