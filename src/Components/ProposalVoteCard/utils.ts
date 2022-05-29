export const voteOnProposal = ({
  votingPowerAtProposalSnapshot,
  votingPowerAtProposalCurrentSnapshot,
}) => {
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
  proposalId,
  selectedAction,
  userVotingPower,
  createTransaction,
}) => {
  createTransaction(`Vote on proposal ${proposal?.title}`, async () =>
    contract.setVote(proposalId, selectedAction, userVotingPower)
  );
};
