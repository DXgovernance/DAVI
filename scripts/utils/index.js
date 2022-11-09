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
        '0x6cfe0489000000000000000000000000140d68e4e3f80cdcf7036de007b3bcec54d38b1f000000000000000000000000ffb1cd0f95368ddd06d556161c5d3d9f0f4fe6d2a9059cbb00000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000',
    };
    return pickOne(Object.values(options));
  }

  getRandomGuildName() {
    return pickOne(this.guilds);
  }

  createProposal(attrs) {
    let totalOptions = randomInt(3) || 1;
    const defaultProposal = {
      type: 'guild-createProposal',
      from: this.accounts[randomInt(2)], // only accounts with voting power
      data: {
        guildName: this.getRandomGuildName(),
        to: Array.from(Array(totalOptions))
          .fill()
          .map(() => pickOne(this.accounts)),
        callData: Array.from(Array(totalOptions))
          .fill()
          .map(() => this.getRandomCallData()),
        value: Array.from(Array(totalOptions))
          .fill()
          .map(() => randomInt(30)),
        totalOptions: `${totalOptions}`,
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

