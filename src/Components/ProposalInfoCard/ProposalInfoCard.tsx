import { useMemo, useState } from 'react';
import {
  Separator,
  InfoDetail,
  InfoDetailMuted,
  SidebarCardContentUnpadded,
  SidebarInfoContent,
  ProposalHistoryIcon,
} from './styled';
import SidebarCard, {
  SidebarCardHeader,
} from 'old-components/Guilds/SidebarCard';
import { Loading } from 'Components/Primitives/Loading';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { InfoItem } from './InfoItem';
import moment, { duration } from 'moment';
import { ProposalInfoCardProps } from './types';

const ProposalInfoCard: React.FC<ProposalInfoCardProps> = ({
  proposal,
  guildConfig,
  quorum,
}) => {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  const endDetail = useMemo(() => {
    if (!proposal || !proposal.endTime) return null;

    const currentTime = moment();
    let prefix = proposal.endTime.isBefore(currentTime) ? 'Ended' : 'Ends';
    return `${prefix} ${proposal.endTime.fromNow()}`;
  }, [proposal]);

  return (
    <SidebarCard header={<SidebarCardHeader>Information</SidebarCardHeader>}>
      <SidebarCardContentUnpadded>
        <SidebarInfoContent>
          <InfoDetail>
            <span>Consensus System</span>
            <InfoDetailMuted>Guild</InfoDetailMuted>
          </InfoDetail>
          <InfoDetail>
            <span>Proposal Duration</span>
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
            <span>Quorum</span>
            <InfoDetailMuted>
              {quorum != null ? (
                `${quorum}%`
              ) : (
                <Loading loading text skeletonProps={{ width: '50px' }} />
              )}
            </InfoDetailMuted>
          </InfoDetail>

          <InfoDetail>
            <span>Proposal History</span>
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
        </SidebarInfoContent>

        {isHistoryExpanded && (
          <>
            <Separator />

            <SidebarInfoContent>
              {!proposal ? (
                <Loading loading text skeletonProps={{ height: '100px' }} />
              ) : (
                <>
                  <InfoItem
                    title="Proposal created"
                    description={proposal.startTime.format(
                      'MMM Do, YYYY - h:mm a'
                    )}
                  />
                  <InfoItem
                    title={endDetail}
                    description={proposal.endTime.format(
                      'MMM Do, YYYY - h:mm a'
                    )}
                  />
                </>
              )}
            </SidebarInfoContent>
          </>
        )}
      </SidebarCardContentUnpadded>
    </SidebarCard>
  );
};

export default ProposalInfoCard;
