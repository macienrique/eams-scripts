// const getCommandBinPath = (command: string) => {
//   const commandPackageJSON = require.resolve(`${command}/package.json`, {
//     paths: [process.cwd()],
//   });

//   const { bin } = require(commandPackageJSON);
//   console.log("command chuj", command, commandPackageJSON);

//   const commandDir = path.dirname(commandPackageJSON);
//   const commandBinPath = path.join(commandDir, bin[command]);

//   return commandBinPath;
// };

const getCommandBinPath = (command: string) => `./node_modules/.bin/${command}`;

export default getCommandBinPath;
