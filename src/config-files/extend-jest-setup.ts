/* eslint-disable no-console */

export const setupThrowOnConsole = () => {
  beforeEach(() => {
    console.error = (...args) => {
      throw new Error(args.toString());
    };

    console.warn = (...args) => {
      throw new Error(args.toString());
    };
  });
};
