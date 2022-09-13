#!/usr/bin/env bash

export SECRET_WORDS="cream core pear sure dinner indoor citizen divorce sudden captain subject remember"
export PASSWORD="TestMetaMask"
export NETWORK_NAME=localhost
export RPC_URL=http://127.0.0.1:8545/
export CHAIN_ID=1337
export IS_TESTNET=true
export CYPRESS_SKIP_RESOURCES_WAIT=true
export FAIL_ON_ERROR=0

# export SKIP_METAMASK_INSTALL=false
# export SKIP_METAMASK_SETUP=false

if [[ $DASHBOARD_KEY ]]; then
  synpress run --configFile ./cypress/config/development.json --record --key $DASHBOARD_KEY
else
  synpress run --configFile ./cypress/config/development.json
fi