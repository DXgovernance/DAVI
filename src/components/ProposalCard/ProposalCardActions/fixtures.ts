import { BigNumber } from 'ethers';

export const mockProposalCardActionsProps = {
  votesOfVoters: {
    action: '1',
    votingPower: BigNumber.from(0),
  },
  proposalCreated: true,
  userAddress: '0x0000000000000000000000000000000000000000',
};
