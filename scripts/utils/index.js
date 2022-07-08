const Chance = require('chance');
const _ = require('lodash');

const chance = new Chance();

const randomInt = (max = 10) =>
  parseInt(Math.ceil(Math.random() * (max + 1) - 1));
const pickOne = arr => {
  return arr[randomInt(arr.length - 1)];
};

class Utils {
  accounts = [];
  guilds = ['DXDGuild', 'REPGuild', 'SWPRGuild'];

  init(accounts) {
    this.accounts = accounts;
  }
  getRandomCallData() {
    const options = {
      none: '0x0',
      transfer1DXDToAnyAddress:
        '0xa9059cbb000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0000000000000000000000000000000000000000000000000de0b6b3a7640000',
      setAnyPermissions:
        '0xa5234bce00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0000000000000000000000000000000000000000000000000000000000000001aaaaaaaa000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001',
    };
    return pickOne(Object.values(options));
  }

  getRandomGuildName() {
    return pickOne(this.guilds);
  }

  createProposal(attrs) {
    let totalActions = randomInt(3) || 1;
    const defaultProposal = {
      type: 'guild-createProposal',
      from: this.accounts[randomInt(2)], // only accounts with voting power
      data: {
        guildName: this.getRandomGuildName(),
        to: Array.from(Array(totalActions))
          .fill()
          .map(() => pickOne(this.accounts)),
        callData: Array.from(Array(totalActions))
          .fill()
          .map(() => this.getRandomCallData()),
        value: Array.from(Array(totalActions))
          .fill()
          .map(() => randomInt(30)),
        totalActions: `${totalActions}`,
        title: chance.sentence(),
        description: chance.paragraph(),
      },
    };
    return _.merge(defaultProposal, attrs);
  }

  createMultipleRandomProposals(n = 1, data = {}) {
    return Array.from(Array(n))
      .fill()
      .map(() => this.createProposal(data));
  }
}

module.exports = new Utils();

