import { useState } from 'react';
import { InfoDetail, InfoDetailMuted, ProposalHistoryIcon } from './styles';
import SidebarCard from 'old-components/Guilds/SidebarCard';
import { Loading } from 'Components/Primitives/Loading';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { duration } from 'moment';
import { ProposalInfoCardProps } from './types';
import { ProposalHistory } from './ProposalHistory';

const ProposalInfoCard: React.FC<ProposalInfoCardProps> = ({
  proposal,
  guildConfig,
  quorum,
  t,
}) => {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  return (
    <SidebarCard header={t('information')}>
      <InfoDetail>
        <span>{t('proposalInfoCard.consensusSystem')}</span>
        <InfoDetailMuted>{t('guilds.guilds_one')}</InfoDetailMuted>
      </InfoDetail>
      <InfoDetail>
        <span>{t('proposalInfoCard.proposalDuration')}</span>
        <InfoDetailMuted>
          {guildConfig?.proposalTime ? (
            duration(
              guildConfig?.proposalTime?.toNumber(),
              'seconds'
            ).humanize()
          ) : (
            <Loading loading text skeletonProps={{ width: '50px' }} />
          )}
        </InfoDetailMuted>
      </InfoDetail>
      <InfoDetail>
        <span>{t('quorum')}</span>
        <InfoDetailMuted>
          {quorum != null ? (
            `${quorum}%`
          ) : (
            <Loading loading text skeletonProps={{ width: '50px' }} />
          )}
        </InfoDetailMuted>
      </InfoDetail>

      <InfoDetail>
        <span>{t('proposalInfoCard.proposalHistory')}</span>
        <ProposalHistoryIcon
          active={isHistoryExpanded}
          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
        >
          {isHistoryExpanded ? (
            <FiChevronUp height={16} />
          ) : (
            <FiChevronDown height={16} />
          )}
        </ProposalHistoryIcon>
      </InfoDetail>

      {isHistoryExpanded && <ProposalHistory proposal={proposal} />}
    </SidebarCard>
  );
};

export default ProposalInfoCard;
