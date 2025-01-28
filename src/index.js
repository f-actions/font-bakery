import core from '@actions/core';
import exec from '@actions/exec';
import glob from '@actions/glob';

import { platform } from '@actions/core';

async function run() {
  const buildPath = core.getInput('path');
  const fbSubCmd = core.getInput('subcmd');
  const fbArgs = core.getInput('args');
  const fbVersion = core.getInput('version');

  // =============
  // Install cairo
  // =============
  // If running a new Ubuntu image, cairo is no longer preinstalled. Try and be
  // helpful
  if (platform.isLinux) {
    const { name, version } = await platform.getDetails();
    if (name === 'Ubuntu' && version >= '24.04') {
      const ubuntuDeps = ['libcairo2-dev'];
      console.log(
        `Installing system dependencies (${ubuntuDeps.join(' ')})...`
      );
      try {
        await exec.exec('sudo apt-get update --quiet --quiet', null, {
          silent: true,
        });
        await exec.exec(
          'sudo apt-get install --yes --no-install-recommends --quiet',
          ubuntuDeps,
          { silent: true }
        );
      } catch (error) {
        core.setFailed(
          `font-bakery Action failed during system dependencies install with error: ${error.message}`
        );
      }
    }
  }
  // ==================
  // Install fontbakery
  // ==================
  try {
    if (fbVersion === 'latest') {
      // this installs the latest stable release
      await exec.exec(
        'python -m pip install --upgrade fontbakery[all] fonttools[interpolatable]'
      );
    } else if (fbVersion === 'pre') {
      // pre-releases happen much more often
      await exec.exec(
        'python -m pip install --pre --upgrade fontbakery[all] fonttools[interpolatable]'
      );
    } else if (fbVersion === 'main') {
      // here one gets the bleeding edge of the git development tree
      await exec.exec(
        'python -m pip install --upgrade fontbakery[all]@git+https://github.com/googlefonts/fontbakery.git fonttools[interpolatable]'
      );
    } else {
      await exec.exec(
        `python -m pip install --upgrade fontbakery[all]==${fbVersion} fonttools[interpolatable]`
      );
    }
    // Show the installed version
    console.log('');
    console.log('Dependency versions after fontbakery installation:');
    await exec.exec('python -m pip list');
    await exec.exec('python -m pip show fontbakery');
  } catch (error) {
    core.setFailed(
      `font-bakery Action failed during fontbakery installation attempt with error: ${error.message}`
    );
  }
  // ==========================
  // Display files to be tested
  // ==========================
  try {
    const globber = await glob.create(`${buildPath}`);
    console.log('');
    console.log('Beginning fontbakery tests on the following files:');
    for await (const file of globber.globGenerator()) {
      console.log(file);
    }
    console.log('');
  } catch (error) {
    core.setFailed(
      `font-bakery Action failed during fontbakery file path display attempt with error: ${error.message}`
    );
  }
  // ========================
  // Execute fontbakery tests
  // ========================
  try {
    if (fbArgs !== 'none') {
      await exec.exec(`fontbakery ${fbSubCmd} ${fbArgs} ${buildPath}`);
    } else {
      await exec.exec(`fontbakery ${fbSubCmd} ${buildPath}`);
    }
  } catch (error) {
    core.setFailed(
      `font-bakery Action failed during fontbakery execution attempt with error: ${error.message}`
    );
  }
}

run();
