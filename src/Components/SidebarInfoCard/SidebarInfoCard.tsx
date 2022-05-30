import { duration } from 'moment';
import SidebarCard, {
  SidebarCardContent,
  SidebarCardHeader,
} from 'old-components/Guilds/SidebarCard';
import { Loading } from 'Components/Primitives/Loading';
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
              <Loading style={{ margin: 0 }} loading text />
            )}
          </ColoredLabel>
        </Row>
        <Row>
          <Label>Quorum</Label>
          <ColoredLabel>
            {quorum != null ? (
              `${quorum}%`
            ) : (
              <Loading style={{ margin: 0 }} loading text />
            )}
          </ColoredLabel>
        </Row>
      </SidebarCardContent>
    </SidebarCard>
  );
};

export default SidebarInfoCard;
