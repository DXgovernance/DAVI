const path = require('path');
const fs = require('fs');

const CONTRACTS = {
  BaseERC20Guild: 'BaseERC20Guild',
  ERC20GuildUpgradeable: 'ERC20GuildUpgradeable',
  SnapshotERC20Guild: 'SnapshotERC20Guild',
  SnapshotRepERC20Guild: 'SnapshotRepERC20Guild',
  DXDGuild: 'DXDGuild',
  DxAvatar: 'DxAvatar',
  DxController: 'DxController',
  DXDVotingMachine: 'DXDVotingMachine',
  DxReputation: 'DxReputation',
};

const artifactsPath = {
  [CONTRACTS.BaseERC20Guild]:
    'dxdao-contracts/artifacts/contracts/erc20guild/BaseERC20Guild.sol/BaseERC20Guild.json',
  [CONTRACTS.ERC20GuildUpgradeable]:
    'dxdao-contracts/artifacts/contracts/erc20guild/ERC20GuildUpgradeable.sol/ERC20GuildUpgradeable.json',
  [CONTRACTS.SnapshotERC20Guild]:
    'dxdao-contracts/artifacts/contracts/erc20guild/implementations/SnapshotERC20Guild.sol/SnapshotERC20Guild.json',
  [CONTRACTS.SnapshotRepERC20Guild]:
    'dxdao-contracts/artifacts/contracts/erc20guild/implementations/SnapshotRepERC20Guild.sol/SnapshotRepERC20Guild.json',
  [CONTRACTS.DXDGuild]:
    'dxdao-contracts/artifacts/contracts/erc20guild/implementations/DXDGuild.sol/DXDGuild.json',
  [CONTRACTS.DxAvatar]:
    'dxdao-contracts/artifacts/contracts/dxdao/DxAvatar.sol/DxAvatar.json',
  [CONTRACTS.DxController]:
    'dxdao-contracts/artifacts/contracts/dxdao/DxController.sol/DxController.json',
  [CONTRACTS.DXDVotingMachine]:
    'dxdao-contracts/artifacts/contracts/dxvote/DXDVotingMachine.sol/DXDVotingMachine.json',
  [CONTRACTS.DxReputation]:
    'dxdao-contracts/artifacts/contracts/dxdao/DxReputation.sol/DxReputation.json',
};

const contractsPath = {
  [CONTRACTS.BaseERC20Guild]: '../src/contracts/BaseERC20Guild.json',
  [CONTRACTS.ERC20GuildUpgradeable]:
    '../src/contracts/ERC20GuildUpgradeable.json',
  [CONTRACTS.SnapshotERC20Guild]: '../src/contracts/SnapshotERC20Guild.json',
  [CONTRACTS.SnapshotRepERC20Guild]:
    '../src/contracts/SnapshotRepERC20Guild.json',
  [CONTRACTS.DXDGuild]: '../src/contracts/DXDGuild.json',
  [CONTRACTS.DxAvatar]: '../src/contracts/DxAvatar.json',
  [CONTRACTS.DxController]: '../src/contracts/DxController.json',
  [CONTRACTS.DXDVotingMachine]: '../src/contracts/DXDVotingMachine.json',
  [CONTRACTS.DxReputation]: '../src/contracts/DxReputation.json',
};

(function () {
  Object.values(CONTRACTS).forEach(contractName => {
    console.log('Updating src/contracts/', contractName);
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
