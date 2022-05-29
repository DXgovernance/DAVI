import { useTheme } from 'styled-components';

import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { Loading } from 'Components/Primitives/Loading';
import { useVotingResults } from 'hooks/Guilds/ether-swr/guild/useVotingResults';
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

//TODO: rewrite css dynamics types
const VotesChart = ({ isPercent }) => {
  const voteData = useVotingResults();
  const theme = useTheme();

  const nQuorum = useBigNumberToNumber(
    voteData?.quorum,
    voteData?.token?.decimals
  );

  const flagCheckered = useVotingPowerPercent(
    voteData?.quorum,
    voteData?.totalLocked
  );

  return (
    <VotesChartContainer>
      {voteData?.options ? (
        <VotesChartRow>
          {Object.values(voteData.options).map((item, i) => {
            const percentBN = voteData?.totalLocked?.isZero()
              ? BigNumber.from(0)
              : item.mul(100).mul(Math.pow(10, 2)).div(voteData?.totalLocked);
            const percent = Math.round(percentBN.toNumber()) / Math.pow(10, 2);

            return (
              <ChartBar percent={percent} color={theme?.colors?.votes?.[i]} />
            );
          })}
        </VotesChartRow>
      ) : (
        <Loading loading text skeletonProps={{ height: 24, count: 2 }} />
      )}
      {voteData && (
        <VoteQuorumContainer quorum={flagCheckered}>
          <VoteQuorumMarker quorum={flagCheckered} />
          <VoteQuorumLabel quorum={flagCheckered}>
            <PaddedFlagCheckered />
            <span>{isPercent ? nQuorum : flagCheckered}</span>
            <span>{isPercent ? voteData?.token?.symbol : '%'}</span>
          </VoteQuorumLabel>
        </VoteQuorumContainer>
      )}
    </VotesChartContainer>
  );
};

export default VotesChart;