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
  selectedOption,
  userVotingPower,
  createTransaction,
  cb,
}: ConfirmVoteProposalProps) => {
  createTransaction(
    `Vote on proposal ${proposal?.title}`,
    async () => contract.setVote(proposal?.id, selectedOption, userVotingPower),
    true,
    cb
  );
};

export const getOptionLabel = ({ metadata, optionKey, t }) => {
  const metadataLabel = metadata?.voteOptions?.[optionKey];
  return metadataLabel
    ? metadataLabel
    : Number(optionKey) === 0
    ? t('against', { defaultValue: 'Against' })
    : t('option', { optionKey });
};
