const core = require("@actions/core");
const glob = require("@actions/glob");
const exec = require("@actions/exec");

async function run() {
  const buildPath = core.getInput("path");
  const fbSubCmd = core.getInput("subcmd");
  const fbArgs = core.getInput("args");
  const fbVersion = core.getInput("version");

  // const options = {};
  // options.listeners = {
  //   stdout: (data) => {
  //     myOutput += data.toString();
  //   },
  //   stderr: (data) => {
  //     myError += data.toString();
  //   },
  // };

  try {
    if (fbVersion == "latest") {
      await exec.exec("python -m pip install --force-reinstall fontbakery");
    } else if (fbVersion == "master") {
      await exec.exec(
        "python -m pip install --force-reinstall git+https://github.com/googlefonts/fontbakery.git"
      );
    } else {
      await exec.exec(
        `python -m pip install --force-reinstall fontbakery==${fbVersion}`
      );
    }
  } catch (error) {
    core.setFailed(
      `font-bakery Action failed during fontbakery installation attempt with error ${err}`
    );
  }

//   try {
//     console.log(`Configuration of ${projectName} started...`);
//     console.log("Received the following project configuration:");
//     console.log(`  - projectname: ${projectName}`);
//     console.log(`  - sourcepath: ${sourcePath}`);
//     console.log(`  - buildpath: ${buildPath}`);
//     console.log(`  - readmepath: ${readmePath}`);
//     console.log(`  - licensepath: ${licensePath}`);
//     console.log(`  - changelogpath: ${changelogPath}`);
//     console.log(`  - py-version: ${pyVersion}`);
//     console.log(`  - dependpath: ${depPath}`);
//     console.log(`  - dev-dependpath: ${devDepPath}`);
//     console.log("");

//     console.log("Exporting values to the build environment...");

//     core.setOutput("projectname", projectName);
//     core.setOutput("sourcepath", sourcePath);
//     core.setOutput("buildpath", buildPath);
//     core.setOutput("readmepath", readmePath);
//     core.setOutput("licensepath", licensePath);
//     core.setOutput("changelogpath", changelogPath);
//     core.setOutput("py-version", pyVersion);
//     core.setOutput("dependpath", depPath);
//     core.setOutput("dev-dependpath", devDepPath);

//     console.log("The font-setup Action completed successfully");
//   } catch (error) {
//     core.setFailed(`font-setup Action failed with error ${err}`);
//   }
// }

run();
