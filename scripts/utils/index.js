const Chance = require('chance');

const chance = new Chance();

class Utils {
  accounts = [];
  guilds = [];

  init(accounts) {
    this.accounts = accounts;
  }
  randomCallData() {
    // TODO: generate diff data
    return '0x0';
  }

  createProposal(attrs) {
    const totalActions = chance.integer({ min: 1, max: 3 });
    const defaultProposal = {
      type: 'guild-createProposal',
      from: this.accounts[chance.integer({ min: 0, max: 2 })],
      data: {
        guildName: 'DXDGuild',
        to: Array(totalActions)
          .fill()
          .map(() => chance.pickone(this.accounts)),
        callData: Array(totalActions).fill().map(this.randomCallData),
        value: Array(totalActions)
          .fill()
          .map(() => chance.integer({ min: 1, max: 30 })),
        totalActions: `${totalActions}`,
        title: chance.sentence(),
        description: chance.paragraph(),
      },
    };
    return Object.assign(defaultProposal, attrs);
  }

  generateMultipleRandomProposals(n = 1, data = {}) {
    return Array.from(Array(n)).map(() => this.createProposal(data));
  }
}

module.exports = new Utils();

