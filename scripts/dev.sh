#!/usr/bin/env bash

echo "Executing beforeBuild"
node scripts/beforeBuild.js

echo "Updating DAVI bytecodes"
node scripts/updateBytecodes.js


# Run dapp with localhost contracts
export REACT_APP_GIT_SHA=$(echo $(git rev-parse  HEAD) | cut -c1-9)
export SKIP_PREFLIGHT_CHECK=true
export REACT_APP_VERSION=$npm_package_version

if [[ $* == *--no-browser* ]]; then
    echo "Setting BROWSER=none. No browser window will pop up"
    export BROWSER=none
fi

FORCE_COLOR=true GENERATE_SOURCEMAP=false yarn react-app-rewired start | cat