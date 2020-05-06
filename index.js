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

  // ==================
  // Install fontbakery
  // ==================
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
    // Show the installed version
    console.log("");
    console.log("Dependency versions after fontbakery installation:");
    await exec.exec("python -m pip list");
    await exec.exec("python -m pip show fontbakery");
  } catch (error) {
    core.setFailed(
      `font-bakery Action failed during fontbakery installation attempt with error ${error.message}`
    );
  }
  try {
    await exec.exec(`fontbakery ${fbSubCmd} ${fbArgs} ${buildPath}`);
  } catch (error) {
    core.setFailed(
      `font-bakery Action failed during fontbakery execution attempt with error ${error.message}`
    );
  }
}

run();
