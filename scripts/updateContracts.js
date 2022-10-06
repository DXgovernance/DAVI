const path = require('path');
const fs = require('fs');

// const { enc, SHA256 } = require('crypto-js');

const CONTRACTS = {
  BaseERC20Guild: 'BaseERC20Guild',
  // SnapshotRepERC20Guild: 'SnapshotRepERC20Guild',
  // SnapshotERC20Guild: 'SnapshotERC20Guild',
  // DXDGuild: 'DXDGuild',
};

const artifactsPath = {
  [CONTRACTS.BaseERC20Guild]:
    '../artifacts/dxdao-contracts/contracts/erc20guild/BaseERC20Guild.sol/BaseERC20Guild.json',
  // [CONTRACTS.SnapshotRepERC20Guild]:
  //   '../artifacts/dxdao-contracts/contracts/erc20guild/implementations/SnapshotRepERC20Guild.sol/SnapshotRepERC20Guild.json',
  // [CONTRACTS.SnapshotERC20Guild]:
  //   '../artifacts/dxdao-contracts/contracts/erc20guild/implementations/SnapshotERC20Guild.sol/SnapshotERC20Guild.json',
  // [CONTRACTS.DXDGuild]:
  //   '../artifacts/dxdao-contracts/contracts/erc20guild/implementations/DXDGuild.sol/DXDGuild.json',
};
const contractsPath = {
  [CONTRACTS.BaseERC20Guild]: '../src/contracts/BaseERC20Guild.json',
};

function main() {
  Object.values(CONTRACTS).forEach(contractName => {
    try {
      const json = require(artifactsPath[contractName]);
      const contractPath = contractsPath[contractName];

      fs.writeFileSync(
        path.resolve(__dirname, contractPath),
        JSON.stringify(json, null, 2)
      );
    } catch (e) {
      console.log(e);
    }
  });
}

main();
