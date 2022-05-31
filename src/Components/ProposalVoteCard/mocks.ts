import moment from 'moment';
import { BigNumber } from 'ethers';

const mockBignumber = BigNumber.from(100000000);
const mockBigNumberOption = BigNumber.from(100000000000000);
const mockBigNumberTotalSupply = BigNumber.from(1000000000000000);
const mockBigNumberTotalLocked = BigNumber.from(1000000000000000);

export const mockProposalVoteCardProps = {
  proposal: {
    id: '0x0',
    metadata: {
      description: 'This is a test proposal',
      voteOptions: ['Yes', 'No'],
    },
    endTime: moment(),
  },
  voteData: {
    options: {
      0: mockBigNumberOption,
      1: mockBigNumberOption,
    },
    quorum: mockBignumber,
    totalLocked: mockBigNumberTotalLocked,
    token: {
      name: 'DXdao',
      symbol: 'DXD',
      decimals: 18,
      totalSupply: mockBigNumberTotalSupply,
    },
  },
  timestamp: 10,
  votingPower: {
    percent: 100,
    userVotingPower: mockBignumber,
    atSnapshot: mockBignumber,
    atCurrentSnapshot: mockBignumber,
  },
  contract: {} as any,
  createTransaction: () => {},
  currentLockedPercent: 100,
};
