import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { formatUnits } from 'ethers/lib/utils';
import type { VoteData } from 'Modules/Guilds/Hooks/useVotingResults';
import { Box } from 'components/primitives/Layout/Box';
import styled from 'styled-components';
import { UseProposalVotesOfVoterReturn } from 'Modules/Guilds/Hooks/useProposalVotesOfVoter';

const Container = styled(Box)`
  margin: 1rem 0 0;
  border-radius: 0.375rem;
  padding: 8px;
  font-size: ${({ theme }) => theme.fontSizes.label};
  background: ${({ theme }) => theme.colors.border1};
`;
interface UserVoteProps {
  votedOptionLabel: string;
  voteData: VoteData;
  isPercent: boolean;
  userVote: UseProposalVotesOfVoterReturn;
}

const UserVote: React.FC<UserVoteProps> = ({
  voteData,
  votedOptionLabel,
  isPercent,
  userVote,
}) => {
  const votingPowerPercent = useVotingPowerPercent(
    userVote.votingPower,
    voteData?.totalLocked,
    2
  );

  const voting = `${formatUnits(userVote.votingPower || 0)} ${
    voteData?.token?.symbol
  }`;

  return userVote.action ? (
    <Container>
      You voted for option "{votedOptionLabel}" with{' '}
      {isPercent ? `${votingPowerPercent}%` : voting}
    </Container>
  ) : null;
};

export default UserVote;
