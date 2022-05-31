import { formatUnits } from 'ethers/lib/utils';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import Bullet from 'old-components/Guilds/common/Bullet';
import { Loading } from 'Components/Primitives/Loading';
import { useTheme } from 'styled-components';
import {
  ResultRowProps,
  VoteResultsProps,
} from 'Components/ProposalVoteCard/types';
import {
  VotesRowWrapper,
  VoteOption,
  OptionBullet,
} from './VoteResults.styled';

const VoteResultRow: React.FC<ResultRowProps> = ({
  isPercent,
  optionKey,
  voteData,
  proposalMetadata,
}) => {
  const theme = useTheme();

  const isReady = optionKey !== undefined;

  const votingPowerPercent = useVotingPowerPercent(
    voteData?.options?.[optionKey],
    voteData?.totalLocked,
    2
  );

  return (
    <VotesRowWrapper>
      <VoteOption>
        <OptionBullet>
          {isReady ? (
            <Bullet color={theme?.colors?.votes?.[optionKey]} size={8} />
          ) : (
            <Loading
              loading
              text
              skeletonProps={{ circle: true, height: 16, width: 16 }}
            />
          )}
        </OptionBullet>

        {isReady ? (
          proposalMetadata?.voteOptions?.[optionKey] ||
          'Option ' + (optionKey + 1)
        ) : (
          <Loading loading text />
        )}
      </VoteOption>
      {isReady && voteData ? (
        <span>
          {isPercent
            ? `${formatUnits(voteData?.options?.[optionKey] || 0)} ${
                voteData?.token?.symbol
              }`
            : `${votingPowerPercent}%`}
        </span>
      ) : (
        <Loading loading text skeletonProps={{ width: 50 }} />
      )}
    </VotesRowWrapper>
  );
};

const VoteResults: React.FC<VoteResultsProps> = ({
  isPercent,
  voteData,
  proposalMetadata,
}) => {
  return voteData ? (
    <>
      {Object.entries(voteData.options).map((_, i) => (
        <VoteResultRow
          optionKey={i}
          isPercent={isPercent}
          voteData={voteData}
          proposalMetadata={proposalMetadata}
        />
      ))}
    </>
  ) : (
    <>
      <VoteResultRow
        isPercent={isPercent}
        voteData={voteData}
        proposalMetadata={proposalMetadata}
      />
      <VoteResultRow
        isPercent={isPercent}
        voteData={voteData}
        proposalMetadata={proposalMetadata}
      />
    </>
  );
};

export default VoteResults;
