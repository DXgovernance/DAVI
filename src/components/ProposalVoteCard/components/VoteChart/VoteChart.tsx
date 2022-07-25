import { useTheme } from 'styled-components';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { Loading } from 'components/Primitives/Loading';
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

//TODO: rewrite css dynamics types
const VotesChart: React.FC<VoteChartProps> = ({ isPercent, voteData }) => {
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
          {Object.entries(voteData.options).map(([idx, item]) => {
            const percentBN = voteData?.totalLocked?.isZero()
              ? BigNumber.from(0)
              : item.mul(100).mul(Math.pow(10, 2)).div(voteData?.totalLocked);
            const percent = Math.round(percentBN.toNumber()) / Math.pow(10, 2);

            return (
              <ChartBar
                key={idx}
                percent={percent}
                color={theme?.colors?.votes?.[idx]}
              />
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
