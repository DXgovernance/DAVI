const path = require('path');
const fs = require('fs');
const { enc, SHA256 } = require('crypto-js');

const GUILD_TYPES = {
  SnapshotRepERC20Guild: 'SnapshotRepERC20Guild',
  SnapshotERC20Guild: 'SnapshotERC20Guild',
  ERC20Guild: 'ERC20Guild',
  DXDGuild: 'DXDGuild',
};

const FEATURES = {
  reputation: 'REP',
  snapshot: 'SNAPSHOT',
};

const artifactsPath = {
  [GUILD_TYPES.ERC20Guild]:
    '../artifacts/dxdao-contracts/contracts/erc20guild/ERC20Guild.sol/ERC20Guild.json',
  [GUILD_TYPES.SnapshotRepERC20Guild]:
    '../artifacts/dxdao-contracts/contracts/erc20guild/implementations/SnapshotRepERC20Guild.sol/SnapshotRepERC20Guild.json',
  [GUILD_TYPES.SnapshotERC20Guild]:
    '../artifacts/dxdao-contracts/contracts/erc20guild/implementations/SnapshotERC20Guild.sol/SnapshotERC20Guild.json',
  [GUILD_TYPES.DXDGuild]:
    '../artifacts/dxdao-contracts/contracts/erc20guild/implementations/DXDGuild.sol/DXDGuild.json',
};

function main() {
  const data = Object.values(GUILD_TYPES).reduce((acc, contractName) => {
    try {
      const json = require(path);
      fs.writeFileSync(
        path.resolve(__dirname, '../src/bytecodes/local.json'),
        JSON.stringify(json, null, 2)
      );
    } catch (e) {
      console.error(
        `[updateDeployedBytecodes.js] File was not found: ${path}. Skipping ${type} \n`,
        e
      );
      return acc;
    }
  }, []);
}

main();
