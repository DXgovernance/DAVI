import { BigNumber } from 'ethers';
import {
  getProposalIdFromEvent,
  getProposalStateFromEvent,
  getVoterFromEvent,
} from './event';

const proposalStateChangedEvent = [
  '0xbb7e28ec3f4e267db67c250efe01929f47b94228ac1ddc87e0d7a04b9355e7b0',
  BigNumber.from(1),
  {
    blockNumber: 337,
    blockHash:
      '0x3656ff68926488f8ca88c7849b3a745fc9c23e4c0b58498ddf66f4c40ac85987',
    transactionIndex: 0,
    removed: false,
    address: '0xE9bDaB08f2FBb370d2a6F6661a92d9B6157E9fd2',
    data: '0x0000000000000000000000000000000000000000000000000000000000000001',
    topics: [
      '0xfee62a9eec0be50eb061c711990ef0f1e17b40ea131d9347b0468acdaf8bf243',
      '0xbb7e28ec3f4e267db67c250efe01929f47b94228ac1ddc87e0d7a04b9355e7b0',
    ],
    transactionHash:
      '0x91faf8746df235b3de9958a8d8aed32b5790f1b8568533e505e3997beed0834f',
    logIndex: 0,
    event: 'ProposalStateChanged',
    eventSignature: 'ProposalStateChanged(bytes32,uint256)',
    args: {
      proposalId:
        '0xbb7e28ec3f4e267db67c250efe01929f47b94228ac1ddc87e0d7a04b9355e7b0',
      newState: BigNumber.from(1),
    },
  },
];

const voteAddedEvent = [
  '0xbb7e28ec3f4e267db67c250efe01929f47b94228ac1ddc87e0d7a04b9355e7b0',
  BigNumber.from(1),
  '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
  BigNumber.from('50000000000000000000'),

  {
    blockNumber: 350,
    blockHash:
      '0x20374efc3920ed54469c34ebd53a79a9a2d667e8bdeada2ae3a8cd96f0937ac4',
    transactionIndex: 0,
    removed: false,
    address: '0xE9bDaB08f2FBb370d2a6F6661a92d9B6157E9fd2',
    data: '0x000000000000000000000000c5b20ade9c9cd5e0cc087c62b26b815a4bc1881f000000000000000000000000000000000000000000000002b5e3af16b1880000',
    topics: [
      '0x583c62f152711bcb1ca6186c1065821ff17a7cbe226dcb559a1c889dcf0d769b',
      '0xbb7e28ec3f4e267db67c250efe01929f47b94228ac1ddc87e0d7a04b9355e7b0',
      '0x0000000000000000000000000000000000000000000000000000000000000001',
    ],
    transactionHash:
      '0x409a74efa5a1c9476c2d073e0100717dd6eb01141c74d2e98a30193961e1d910',
    logIndex: 0,
    event: 'VoteAdded',
    eventSignature: 'VoteAdded(bytes32,uint256,address,uint256)',
    args: {
      proposalId:
        '0xbb7e28ec3f4e267db67c250efe01929f47b94228ac1ddc87e0d7a04b9355e7b0',
      option: BigNumber.from(1),
      voter: '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
      votingPower: BigNumber.from('50000000000000000000'),
    },
  },
];

const tokensLockedEvent = [
  '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
  BigNumber.from('30000000000000000000'),
  {
    blockNumber: 534,
    blockHash:
      '0x39ba11395f4139fb8289c18d42628fd81875b849e1ede56a0ad719de6ccc7e10',
    transactionIndex: 0,
    removed: false,
    address: '0xBF81De2C44B15e0d2c7AEaa0FBba4f1Dd02E3570',
    data: '0x000000000000000000000000c5b20ade9c9cd5e0cc087c62b26b815a4bc1881f000000000000000000000000000000000000000000000001a055690d9db80000',
    topics: [
      '0xac87f20a77d28ee8bbb58ec87ea8fa968b3393efae1a368fd50b767c2847391c',
    ],
    transactionHash:
      '0x7dcc585500ae4cb3a15b3714fcd43b77a8919f526bbb376c985482839eeb9f6c',
    logIndex: 2,
    event: 'TokensLocked',
    eventSignature: 'TokensLocked(address,uint256)',
    args: {
      voter: '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
      value: BigNumber.from('30000000000000000000'),
    },
  },
];

describe('event', () => {
  describe('getProposalIdFromEvent', () => {
    const proposalId =
      '0xbb7e28ec3f4e267db67c250efe01929f47b94228ac1ddc87e0d7a04b9355e7b0';

    it('should get the proposalId from the ProposalStateChanged event', () => {
      const proposalIdFromEvent = getProposalIdFromEvent(
        proposalStateChangedEvent
      );
      expect(proposalIdFromEvent).toBe(proposalId);
    });

    it('should get the proposalId from the VoteAdded event', () => {
      const proposalIdFromEvent = getProposalIdFromEvent(voteAddedEvent);
      expect(proposalIdFromEvent).toBe(proposalId);
    });
  });

  describe('getProposalStateFromEvent', () => {
    it('should get the proposal state', () => {
      const proposalStateFromEvent = getProposalStateFromEvent(
        proposalStateChangedEvent
      );

      expect(proposalStateFromEvent).toBe('Active');
    });
  });

  describe('getVoterFromEvent', () => {
    const voter = '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f';
    it('should get the voter from VoteAdded', () => {
      const voterFromEvent = getVoterFromEvent(voteAddedEvent);
      expect(voterFromEvent).toBe(voter);
    });

    it('should get the voter from TokensLocked', () => {
      const voterFromEvent = getVoterFromEvent(tokensLockedEvent);
      expect(voterFromEvent).toBe(voter);
    });
  });
});
