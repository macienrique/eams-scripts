import { SpawnSyncReturns } from 'child_process';
import { generateSadness } from './generate-message';

const handleProcess = (processName: string, childProcess: SpawnSyncReturns<Buffer>) => {
  if (childProcess.status && childProcess.status !== 0) {
    generateSadness(processName);
    process.exit(childProcess.status);
  }
};

export default handleProcess;
