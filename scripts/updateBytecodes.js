const fs = require('fs');
const path = require('path');
const local = require('dxdao-contracts/bytecodes/local.json');

fs.writeFileSync(
  path.resolve(__dirname, '../src/bytecodes/local.json'),
  JSON.stringify(local, null, 2)
);

