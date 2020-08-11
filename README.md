# f-actions/font-bakery GitHub Action

![Version](https://img.shields.io/github/v/release/f-actions/font-bakery?sort=semver)
[![Action CI](https://github.com/f-actions/font-bakery/workflows/Action%20CI/badge.svg)](https://github.com/f-actions/font-bakery/actions?query=workflow%3A%22Action+CI%22)
[![Lint](https://github.com/f-actions/font-bakery/workflows/Lint/badge.svg)](https://github.com/f-actions/font-bakery/actions?query=workflow%3ALint)

This GitHub Action installs the [googlefonts/fontbakery](https://github.com/googlefonts/fontbakery/) typeface project quality assurance tool and executes the tool on a user-specified filepath as part of a remote continuous integration testing pipeline.  The Action requires a Python v3.6+ runner environment.

## Quick Start

Create a yaml formatted GitHub Actions configuration file on the directory path `.github/workflows` in your source repository.  Please review the GitHub Actions documentation for detailed instructions on the configuation file syntax.

**Please note**: These steps require that the fonts are built in your CI workflow before the fontbakery testing steps are executed *or* are under git version control and pushed to a remote source repository directory path.  The example below assumes a Makefile based build that uses the default make target.  Customize the build command with the approach that you use in your project.

### Example workflow

```yaml
name: Font Bakery QA Tests

on: [push, pull_request]

jobs:
  fontbakery:
    runs-on: ubuntu-latest
    name: Font Bakery QA tests  # Customize to edit the string in your GitHub CI UI
    steps:
      - name: Check out source repository
        uses: actions/checkout@v2
      - name: Set up Python environment
        uses: actions/setup-python@v1
        with:
          python-version: "3.8"  # supports any Py3.6+ version available in Actions
      - name: Build fonts
        run: make  # enter your build shell commands here
      - name: fontbakery TTF checks
        uses: f-actions/font-bakery@v1
        with:
          subcmd: "check-universal"  # fontbakery sub-command
          args: "--loglevel WARN"  # optional arguments to fontbakery
          path: "path/to/*.ttf"  # font path relative to root of repository
          version: "latest"  # optional, latest PyPI release is default
      - name: fontbakery OTF checks
        uses: f-actions/font-bakery@v1
        with:
          subcmd: "check-universal"  # fontbakery sub-command
          args: "--loglevel WARN"  # optional arguments to fontbakery
          path: "path/to/*.otf"  # font path relative to root of repository
          version: "latest"  # optional, latest PyPI release is default
```

See the Inputs section below for details on default inputs and optional configuration settings.

## Inputs

Configure the Action with the following settings:

### `args`

**Optional** The non-path arguments to the fontbakery executable sub-command.  For example, this is a location where the log level may be set. The setting below limits reporting to log levels of WARN and higher:

```
args: "--loglevel WARN"
```

 See the fontbakery help menus for details on available options.

### `path`

**Optional** The path to the font file(s).  You may use wildcards in this path definition. Default: `build` directory

 ```
path: "path/to/*.ttf"
 ```

### `subcmd`

**Mandatory** The fontbakery sub-command.  This specifies the test profile that is executed on your fonts.

 ```
subcmd: "check-universal"
 ```

 See `fontbakery --help` or the [fontbakery documentation](https://font-bakery.readthedocs.io/en/stable/) for additional details.

### `version`

**Optional** The fontbakery version that should be used for testing.  This supports PyPI releases and direct source repository master branch installations.  Options: ["latest", "master", "[VERSION NUMBER]"].  Default: "latest" = latest PyPI release version.

## Outputs

None

## License

[Apache License, v2.0](LICENSE)
