import { duration } from 'moment';
import SidebarCard, {
  SidebarCardContent,
  SidebarCardHeader,
} from 'components/SidebarCard';
import { Loading } from 'components/Primitives/Loading';
import { Row, Label, ColoredLabel } from './SidebarInfoCard.styled';
import { SidebarInfoCardProps } from './types';
import { useTranslation } from 'react-i18next';

const SidebarInfoCard: React.FC<SidebarInfoCardProps> = ({
  proposalTime,
  quorum,
}) => {
  const { t } = useTranslation();

  return (
    <SidebarCard
      header={<SidebarCardHeader>{t('information')}</SidebarCardHeader>}
    >
      <SidebarCardContent>
        <Row>
          <Label>{t('consensusSystem')}</Label>
          <ColoredLabel>{t('guilds.guild')}</ColoredLabel>
        </Row>
        <Row>
          <Label>{t('proposalDuration')}</Label>
          <ColoredLabel>
            {proposalTime ? (
              duration(proposalTime?.toNumber(), 'seconds').humanize()
            ) : (
              <Loading style={{ margin: 0 }} loading text />
            )}
          </ColoredLabel>
        </Row>
        <Row>
          <Label>{t('quorum')}</Label>
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
