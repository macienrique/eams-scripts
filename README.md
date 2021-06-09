# EAMS-Scripts

##### Author: Enrique Andres Macias Santillana

##### Email: macsantenrique@gmail.com

## How to install

```
npm install eams-scripts --save-dev
```

## This library helps you with:

- Build React (more to come) applications (using react-scripts)
- Testing them with jest
- Formatting with eslint and prettier
- Setting up CI with husky and lint-staged
- Adding useful props to tsconfig.ts to help you write better code!
- more functionalities to come!

This library helps you set up the following scripts that are commonly used with `eams-scripts`:

```json
...
"scripts": {
    "preinstall": "export SASS_BINARY_DIR=${PWD}/npm-packages-offline-cache || set SASS_BINARY_DIR=${PWD}/npm-packages-offline-cache",
    "start": "eams-scripts start",
    "build:local": "eams-scripts build local",
    "build:int": "eams-scripts build int",
    "build:uat": "eams-scripts build uat-df",
    "build:uat-ti": "eams-scripts build uat-ti",
    "build:prod": "eams-scripts build prod",
    "test": "eams-scripts test",
    "test:staged": "eams-scripts-scripts test --env=jsdom --findRelatedTests",
    "test:file": "eams-scripts test",
    "test:coverage": "eams-scripts test --coverage",
    "check": "eams-scripts check",
    "lint": "eams-scripts lint",
    "deploy:int": "./deploy-int.sh"
  },
...
```
