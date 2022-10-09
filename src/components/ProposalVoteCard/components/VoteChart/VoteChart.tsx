import { useTheme } from 'styled-components';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { Loading } from 'components/primitives/Loading';
import { BigNumber } from 'ethers';
import {
  VotesChartContainer,
  VotesChartRow,
  ChartBar,
  VoteQuorumContainer,
  VoteQuorumMarker,
  VoteQuorumLabel,
  PaddedFlagCheckered,
} from './VoteChart.styled';
import { VoteChartProps } from '../../types';
import { useEffect, useState } from 'react';

//TODO: rewrite css dynamics types
const VotesChart: React.FC<VoteChartProps> = ({
  isPercent,
  voteData,
  offChainVotes,
}) => {
  const theme = useTheme();

  const nQuorum = useBigNumberToNumber(
    voteData?.quorum,
    voteData?.token?.decimals
  );
  const flagCheckered = useVotingPowerPercent(
    voteData?.quorum,
    voteData?.totalLocked
  );

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

    console.log(magicHappens);
    setFilteredData(magicHappens);
  }, [offChainVotes]);

  return (
    <VotesChartContainer>
      {voteData?.options ? (
        <>
          {Object.entries(voteData.options).map(([idx, item]) => {
            const percentBN = BigNumber.from(
              voteData?.totalLocked || 0
            ).isZero()
              ? BigNumber.from(0)
              : item.mul(100).mul(Math.pow(10, 2)).div(voteData?.totalLocked);
            const percent = Math.round(percentBN.toNumber()) / Math.pow(10, 2);

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
                  key={idx}
                  percent={signedPercent}
                  color={theme?.colors?.grey}
                />
              </VotesChartRow>
            );
          })}
        </>
      ) : (
        <Loading loading text skeletonProps={{ height: 24, count: 2 }} />
      )}
      {voteData && (
        <VoteQuorumContainer quorum={flagCheckered}>
          <VoteQuorumMarker quorum={flagCheckered} />
          <VoteQuorumLabel quorum={flagCheckered}>
            <PaddedFlagCheckered />
            <span>{isPercent ? flagCheckered : nQuorum}</span>
            <span>{isPercent ? '%' : voteData?.token?.symbol}</span>
          </VoteQuorumLabel>
        </VoteQuorumContainer>
      )}
    </VotesChartContainer>
  );
};

export default VotesChart;
