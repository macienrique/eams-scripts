import chalk from 'chalk';

export const redConsole = (message: string) => {
  console.log(chalk.red(message));
};

export const greenConsole = (message: string) => {
  console.log(chalk.green(message));
};
