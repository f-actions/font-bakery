# Changelog

## v3.1.1

- add support for automatic cairo library installations on Ubuntu runners. Ubuntu runners v24.04 and later no longer have cairo installed by default.
- updated structured-clone library to v1.3.0

## v3.1.0

- use the fontttools[interpolatable] extras on pip install.  This adds new Python dependencies, including scipy, that can significantly improve the execution time of interpolatable checks
- updated eslint to ^8.56.0
- updated @vercel/ncc to ^0.38.1

## v3.0.0

- [Backwards incompatible with fontbakery < v0.9.0] added default support for the fontbakery all extras dependencies installation at fontbakery install
- [Backwards incomaptible with f-actions/font-bakery@v2 and earlier] Made the `path` font path input mandatory and removed the default definition if this is not defined
- removed a number of unnecessary node dev depependencies
- revised the eslint configuration on the JS source lints
- updated estlint CI testing to use a node20 environment (from node16 which is deprecated)
- updated Makefile dev-update target to use the updated npm option definition approach to developer dependency updates
- updated Makefile dist target to include `--legacy-peer-deps` and `NODE_OPTIONS=--openssl-legacy-provider` options at distribution JS file build time
- updated the README link to the fontbakery project which has moved to the fonttools org from the googlefonts org since our last release here

## v2.0.0

- change `version` configuration input field "master" definition to "main" (**Note**: backwards incompatible change for users who were previous users of the "master" definition)
- update the f-actions/font-bakery Action to use node.js v16 (addresses GitHub deprecation warnings)
- update all CI test workflows in this repository to use node.js 16 versions

## v1.1.0

- add `version` configuration input field `pre` option, this installs pre-release versions of fontbakery (#164)
- update cPython CI testing versions to 3.8, 3.9, 3.10, 3.11
- update actions/core to ^1.10.0
- update actions/exec to ^1.1.1
- update actions/glob to ^0.3.0
- update eslint-config-airbnb-base to ^14.2.1
- update estlint-plugin-import to ^2.26.0
- update eslint-plugin-jsx-a11y to ^6.6.1
- update eslint-plugin-prettier to ^3.4.1
- update eslint-plugin-promise to ^4.3.1
- update eslint-plugin-react to ^7.31.10
- update jest to ^29.2.2

## v1.0.2

- documentation updates
- update eslint-plugin-react dependency to v7.20.5
- update jest dependency to v26.3.0

## v1.0.1

- update lodash dependency to v4.17.19 ([minor security vulnerability](https://github.com/f-actions/font-bakery/pull/17#event-3567011284))

## v1.0.0

- initial release
