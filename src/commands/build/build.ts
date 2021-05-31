import spawn from "cross-spawn";
import fs from "fs";
import path from "path";
import {
  Environments,
  isCorrectEnvironment,
} from "../../domain/script-arguments";
import compress from "../../util/compress";
import getCommandBinPath from "../../util/get-command";

const buildBin = "react-scripts";
const compressScriptPath = "../../util/compress.js";

const build = (environment: Environments) => {
  if (!isCorrectEnvironment(environment)) {
    console.log("incorrect environment", environment);
    return;
  }

  const localPackageJSONPath = path.resolve(process.cwd(), "package.json");
  const localPackageJSON = JSON.parse(
    fs.readFileSync(localPackageJSONPath, "utf-8")
  );
  const { dependencies, devDependencies } = localPackageJSON;

  const hasReactScripts = Boolean(
    dependencies[buildBin] || devDependencies[buildBin]
  );

  if (hasReactScripts) {
    const reactScriptsBinPath = getCommandBinPath(buildBin);
    const dotenvBinPath = getCommandBinPath("dotenv");

    spawn.sync(
      `${dotenvBinPath} -e .env.${environment} ${reactScriptsBinPath} build`,
      {
        stdio: "inherit",
        shell: true,
      }
    );

    console.log("compressing");

    compress();
  }
};

export default build;
