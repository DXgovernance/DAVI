import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { duration } from 'moment';

import SidebarCard, {
  SidebarCardContent,
  SidebarCardHeader,
} from 'components/Guilds/SidebarCard';
import { Flex } from 'components/Guilds/common/Layout';
import { useParams } from 'react-router-dom';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';

const Row = styled(Flex)`
  margin-bottom: 0.8rem;
  flex-direction: row;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.text};
`;

const ColoredLabel = styled(Label)`
  color: ${({ theme }) => theme.colors.proposalText.lightGrey};
`;

export const SidebarInfoCard = () => {
  const { guildId } = useParams();
  const { data } = useGuildConfig(guildId);

  const quorum = useVotingPowerPercent(
    data?.votingPowerForProposalExecution,
    data?.totalLocked
  );

  return (
    <SidebarCard header={<SidebarCardHeader>Information</SidebarCardHeader>}>
      <SidebarCardContent>
        <Row>
          <Label>Consensus System</Label>
          <ColoredLabel>Guild</ColoredLabel>
        </Row>
        <Row>
          <Label>Proposal Duration</Label>
          <ColoredLabel>
            {data?.proposalTime ? (
              duration(data?.proposalTime?.toNumber(), 'seconds').humanize()
            ) : (
              <Skeleton width={50} />
            )}
          </ColoredLabel>
        </Row>
        <Row>
          <Label>Quorum</Label>
          <ColoredLabel>
            {quorum != null ? `${quorum}%` : <Skeleton width={50} />}
          </ColoredLabel>
        </Row>
      </SidebarCardContent>
    </SidebarCard>
  );
};
