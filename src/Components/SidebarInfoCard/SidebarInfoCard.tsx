import { duration } from 'moment';
import SidebarCard, {
  SidebarCardContent,
  SidebarCardHeader,
} from 'old-components/Guilds/SidebarCard';
import Skeleton from 'react-loading-skeleton';
import { Row, Label, ColoredLabel } from './SidebarInfoCard.styled';
import { SidebarInfoCardProps } from './types';

const SidebarInfoCard: React.FC<SidebarInfoCardProps> = ({
  proposalTime,
  quorum,
}) => {
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
            {proposalTime ? (
              duration(proposalTime?.toNumber(), 'seconds').humanize()
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

export default SidebarInfoCard;
