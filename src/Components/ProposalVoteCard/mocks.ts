import moment from 'moment';
import { BigNumber } from 'ethers';

const mockBignumber = BigNumber.from(1000);

export const mockProposalVoteCardProps = {
  proposal: {
    id: '0x0',
    metadata: {
      description: '',
      voteOptions: [],
    },
    endTime: moment(),
  },
  voteData: {
    options: {},
    quorum: mockBignumber,
    totalLocked: mockBignumber,
    token: {
      name: '',
      symbol: '',
      decimals: 0,
      totalSupply: mockBignumber,
    },
  },
  timestamp: 10,
  votingPower: {
    percent: 10,
    userVotingPower: mockBignumber,
    atSnapshot: mockBignumber,
    atCurrentSnapshot: mockBignumber,
  },
  contract: {} as any,
  createTransaction: jest.fn(),
  currentLockedPercent: 10,
};
