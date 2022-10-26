#!/usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

# Executes cleanup function at script exit.
trap cleanup EXIT

cleanup() {
  # Kill the hardhat instance that we started (if we started one and if it's still running).
  if [ -n "$hardhat_pid" ] && ps -p $hardhat_pid > /dev/null; then
    kill -9 $hardhat_pid
  fi
}

hardhat_running() {
  nc -z localhost 8545
}

start-hardhat_node() {

  rm -r contracts
  cp -r node_modules/dxdao-contracts/contracts ./contracts
  rm -r contracts/utils/GnosisSafe

  yarn hardhat compile
  
  yarn hardhat node --no-deploy > /dev/null &

  hardhat_pid=$!

  echo "Waiting for hardhat to launch..."

  while ! hardhat_running; do
    sleep 0.1 # wait for 1/10 of the second before check again
  done

  echo "Harhat node launched!"
}

if hardhat_running; then
  echo "Killing existent hardhat"
  kill $(lsof -t -i:8545) 
fi

echo "Starting our own hardhat node instance"
start-hardhat_node

DEPLOY_SALT="0x597fe520ef4c65015e0532273879fe955f79a4ff059b4f30d40aff43dda27a45" yarn hardhat --network localhost run scripts/deployGuilds.js

FORCE_COLOR=true GENERATE_SOURCEMAP=false yarn react-app-rewired start | cat