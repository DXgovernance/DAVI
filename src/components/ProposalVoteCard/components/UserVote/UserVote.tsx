import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import { formatUnits } from 'ethers/lib/utils';
import type { VoteData } from 'hooks/Guilds/ether-swr/guild/useVotingResults';
import { Box } from 'components/primitives/Layout/Box';
import styled from 'styled-components';

const Container = styled(Box)`
  margin: 1rem 0 0;
  border: 1px solid #292b2f;
  border-radius: 12px;
  padding: 8px;
  font-size: 12px;
  background: #303338;
`;
interface UserVoteProps {
  votedOptionKey: string;
  votedOptionLabel: string;
  voteData: VoteData;
  isPercent: boolean;
}

const UserVote: React.FC<UserVoteProps> = ({
  voteData,
  votedOptionKey,
  votedOptionLabel,
  isPercent,
}) => {
  const votingPowerPercent = useVotingPowerPercent(
    voteData?.options?.[votedOptionKey],
    voteData?.totalLocked,
    2
  );

  const voting = `${formatUnits(voteData?.options?.[votedOptionKey] || 0)} ${
    voteData?.token?.symbol
  }`;

  return votedOptionKey ? (
    <Container>
      You voted for option "{votedOptionLabel}" with{' '}
      {isPercent ? `${votingPowerPercent}%` : voting}
    </Container>
  ) : null;
};

export default UserVote;
