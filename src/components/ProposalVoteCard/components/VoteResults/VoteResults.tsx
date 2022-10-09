import { formatUnits } from 'ethers/lib/utils';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { Bullet } from 'components/primitives/Bullet';
import { Loading } from 'components/primitives/Loading';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { getOptionLabel } from 'components/ProposalVoteCard/utils';
import {
  ResultRowProps,
  VoteResultsProps,
} from 'components/ProposalVoteCard/types';
import {
  VotesRowWrapper,
  VoteOption,
  OptionBullet,
} from './VoteResults.styled';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { ChartBar, VotesChartRow } from '../VoteChart/VoteChart.styled';

const VoteResultRow: React.FC<ResultRowProps> = ({
  isPercent,
  optionKey,
  voteData,
  proposalMetadata,
  offChainVotes,
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

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let magicHappens = [];

    if (offChainVotes && offChainVotes.length > 0) {
      offChainVotes.forEach(vote => {
        let option = parseInt(vote.content.data.option._hex, 16);
        let currentOptionVotes = magicHappens[option];

        if (!currentOptionVotes) magicHappens[option] = BigNumber.from(0);
        magicHappens[option] = magicHappens[option].add(
          vote.content.data.votingPower
        );
      });
    }

    setFilteredData(magicHappens);
  }, [offChainVotes]);

  return (
    <>
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
              ? `${votingPowerPercent}%`
              : `${formatUnits(voteData?.options?.[optionKey] || 0)} ${
                  voteData?.token?.symbol
                }`}
          </span>
        ) : (
          <Loading loading text skeletonProps={{ width: 50 }} />
        )}
      </VotesRowWrapper>
      <VotesRowWrapper>
        {voteData &&
          voteData.options &&
          Object.entries(voteData.options).map(([idx, item]) => {
            if (parseInt(idx) === optionKey) {
              const percentBN = BigNumber.from(
                voteData?.totalLocked || 0
              ).isZero()
                ? BigNumber.from(0)
                : item.mul(100).mul(Math.pow(10, 2)).div(voteData?.totalLocked);
              const percent =
                Math.round(percentBN.toNumber()) / Math.pow(10, 2);

              const signedPercentBN = BigNumber.from(
                filteredData[idx] || 0
              ).isZero()
                ? BigNumber.from(0)
                : filteredData[idx]
                    .mul(100)
                    .mul(Math.pow(10, 2))
                    .div(voteData?.totalLocked);
              const signedPercent =
                Math.round(signedPercentBN.toNumber()) / Math.pow(10, 2);

              return (
                <VotesChartRow>
                  <ChartBar
                    key={idx}
                    percent={percent}
                    color={theme?.colors?.votes?.[idx]}
                  />
                  <ChartBar
                    key={`${idx}-2`}
                    percent={signedPercent}
                    color={theme?.colors?.grey}
                  />
                </VotesChartRow>
              );
            } else {
              return <></>;
            }
          })}
      </VotesRowWrapper>
    </>
  );
};

const VoteResults: React.FC<VoteResultsProps> = ({
  isPercent,
  voteData,
  proposalMetadata,
  offChainVotes,
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
          offChainVotes={offChainVotes}
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
