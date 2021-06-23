import path from 'path';

const getCommandBinPath = (command: string) => path.resolve(process.cwd(), 'node_modules', '.bin', command);

export default getCommandBinPath;
