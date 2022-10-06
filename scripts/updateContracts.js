const path = require('path');
const fs = require('fs');

const CONTRACTS = {
  BaseERC20Guild: 'BaseERC20Guild',
  ERC20GuildUpgradeable: 'ERC20GuildUpgradeable',
  SnapshotERC20Guild: 'SnapshotERC20Guild',
  SnapshotRepERC20Guild: 'SnapshotRepERC20Guild',
};

const artifactsPath = {
  [CONTRACTS.BaseERC20Guild]:
    '../artifacts/dxdao-contracts/contracts/erc20guild/BaseERC20Guild.sol/BaseERC20Guild.json',
  [CONTRACTS.ERC20GuildUpgradeable]:
    '../artifacts/dxdao-contracts/contracts/erc20guild/ERC20GuildUpgradeable.sol/ERC20GuildUpgradeable.json',
  [CONTRACTS.SnapshotERC20Guild]:
    '../artifacts/dxdao-contracts/contracts/erc20guild/implementations/SnapshotERC20Guild.sol/SnapshotERC20Guild.json',
  [CONTRACTS.SnapshotRepERC20Guild]:
    '../artifacts/dxdao-contracts/contracts/erc20guild/implementations/SnapshotRepERC20Guild.sol/SnapshotRepERC20Guild.json',
};

const contractsPath = {
  [CONTRACTS.BaseERC20Guild]: '../src/contracts/BaseERC20Guild.json',
  [CONTRACTS.ERC20GuildUpgradeable]:
    '../src/contracts/ERC20GuildUpgradeable.json',
  [CONTRACTS.SnapshotERC20Guild]: '../src/contracts/SnapshotERC20Guild.json',
  [CONTRACTS.SnapshotRepERC20Guild]:
    '../src/contracts/SnapshotRepERC20Guild.json',
};

(function () {
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
      console.log(contractName);
    }
  });
})();
