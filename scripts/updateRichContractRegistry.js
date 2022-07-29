/**
 * This script is to update ipfs rich contract registry.
 * Fist you need to do the proper modifications in ${REGISTRY_DATA_PATH}
 * Then you need to run this script. The app will get the new updated hash
 */
const fs = require('fs');
const IPFS = require('ipfs-mini');

const ipfs = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});
const REGISTRY_DATA_PATH = 'schema/rich-contracts-registry.json';

(async () => {
  console.debug('Getting registry data from ', REGISTRY_DATA_PATH);
  const data = fs.readFileSync(REGISTRY_DATA_PATH, 'utf8');
  console.debug('Getting ipfs hash..');
  const hash = await ipfs.add(data);
  console.debug('Updating config data with new registry hash...', hash);
  const config = fs.readFileSync('src/configs/index.ts', 'utf8');
  const searchString = 'export const RICH_CONTRACT_DATA_REGISTRY';
  const regex = new RegExp('^.*' + searchString + '.*$', 'gm');

  const newConfig = config.replace(
    regex,
    `export const RICH_CONTRACT_DATA_REGISTRY = '${hash}';`
  );
  fs.writeFileSync('src/configs/index.ts', newConfig);
  console.debug('Done!');
  process.exit(1);
})();

