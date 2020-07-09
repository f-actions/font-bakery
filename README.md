# f-actions/font-bakery GitHub Action

This GitHub Action installs the [googlefonts/fontbakery]() typeface project quality assurance tool and executes the tool on a user-specified filepath as part of a remote continuous integration testing pipeline.  The Action requires a Python runner environment.

## Quick Start

Note that these steps require that the fonts are built in your CI workflow before the fontbakery testing steps are executed *or* are under git version control and pushed to a remote source repository directory path.

### Example workflow

```yaml
name: Font Bakery QA Tests

on: [push, pull_request]

jobs:
  fontbakery:
    runs-on: ubuntu-latest
    name: Font Bakery QA tests
    steps:
      - name: Check out source repository
        uses: actions/checkout@v2
      - name: Set up Python environment
        uses: actions/setup-python@v1
        with:
          python-version: "3.8"
    - name: Test with fontbakery
      uses: f-actions/font-bakery@v1
      with:
        path: "path/to/*.ttf"
        subcmd: "check-universal"
        args: "--loglevel WARN"
        version: "latest"
```

See the Inputs section below for details on the defaults and optional configuration settings.

## Inputs

Configure the Action with the following settings:

### `args`

**Mandatory** The non-path arguments to the fontbakery executable.  For example, this is a location where the log level may be set. The setting below limits reporting to log levels of WARN and higher:

```
args: "--loglevel WARN"
```

 See the fontbakery help menus for details on available options.

### `path`

**Mandatory** The path to the font file(s).  You may use wildcards in this path definition.

 ```
path: "path/to/*.ttf"
 ```

### `subcmd`

**Mandatory** The fontbakery sub-command.  This specifies the test profile that is executed on your fonts.

 ```
subcmd: "check-universal"
 ```

### `version`

**Optional** The fontbakery version that should be used for testing.  This supports PyPI releases and direct source repository master branch installations.  Options: ["latest", "master", "[VERSION NUMBER]"].  Default: "latest" = latest PyPI release version.

## Outputs

None

## License

[Apache License, v2.0](LICENSE)