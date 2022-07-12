import { ConfirmVoteProposalProps, VoteOnProposalProps } from './types';

export const voteOnProposal = ({
  votingPowerAtProposalSnapshot,
  votingPowerAtProposalCurrentSnapshot,
}: VoteOnProposalProps) => {
  const hasNoVotingPower =
    votingPowerAtProposalSnapshot &&
    Number(votingPowerAtProposalSnapshot?.toString()) <= 0;

  const hasVotingPowerAtCurrentSnapshot =
    votingPowerAtProposalCurrentSnapshot &&
    Number(votingPowerAtProposalCurrentSnapshot?.toString()) > 0;
  return {
    hasNoVotingPower,
    hasVotingPowerAtCurrentSnapshot,
  };
};

export const confirmVoteProposal = ({
  proposal,
  contract,
  selectedAction,
  userVotingPower,
  createTransaction,
  cb,
}: ConfirmVoteProposalProps) => {
  createTransaction(
    `Vote on proposal ${proposal?.title}`,
    async () => contract.setVote(proposal?.id, selectedAction, userVotingPower),
    true,
    cb
  );
};
