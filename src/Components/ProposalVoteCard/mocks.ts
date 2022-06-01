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

export const mockVoteResults = {
  isPercent: true,
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
  proposalMetadata: {
    description: 'This is a test proposal',
    voteOptions: ['Yes', 'No'],
  },
};

export const mockVoteConfirmationModal = {
  isOpen: true,
  onDismiss: () => {},
  onConfirm: () => {},
  selectedAction: 'Yes',
  votingPower: 100,
  totalLocked: 100,
};

export const mockVoteChart = {
  isPercent: true,
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
};
