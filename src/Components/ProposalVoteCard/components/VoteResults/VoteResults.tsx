import { formatUnits } from 'ethers/lib/utils';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import Bullet from 'Components/Primitives/Bullet';
import { Loading } from 'Components/Primitives/Loading';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { getOptionLabel } from 'Components/ProposalVoteCard/utils';
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
  const { t } = useTranslation();

  const isReady = optionKey !== undefined;

  const votingPowerPercent = useVotingPowerPercent(
    voteData?.options?.[optionKey],
    voteData?.totalLocked,
    2
  );

  const label = getOptionLabel({ metadata: proposalMetadata, optionKey, t });
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
        {isReady ? label : <Loading loading text />}
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
  const orderedOptions = voteData?.options && [
    ...Object.keys(voteData.options).slice(1),
    '0',
  ];

  return orderedOptions ? (
    <>
      {orderedOptions.map(key => (
        <VoteResultRow
          key={key}
          optionKey={Number(key)}
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
