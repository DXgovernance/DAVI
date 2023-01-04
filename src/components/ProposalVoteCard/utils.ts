import { VoteOnProposalProps } from './types';

export const checkVotingPower = ({
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

export const getOptionLabel = ({ metadata, optionKey, t }) => {
  const metadataLabel = metadata?.voteOptions?.[optionKey];
  return metadataLabel
    ? metadataLabel
    : Number(optionKey) === 0
    ? t('against', { defaultValue: 'Against' })
    : t('option', { optionKey });
};
