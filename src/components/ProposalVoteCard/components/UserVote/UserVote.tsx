// import { BigNumber } from 'ethers';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { formatUnits } from 'ethers/lib/utils';
import type { VoteData } from 'Modules/Guilds/Hooks/useVotingResults';
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
  votedOptionLabel: string;
  voteData: VoteData;
  isPercent: boolean;
  userVote: any; // TODO: assign types
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
