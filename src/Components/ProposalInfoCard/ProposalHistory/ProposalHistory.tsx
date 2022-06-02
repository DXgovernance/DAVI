import { Loading } from 'Components/Primitives/Loading';
import moment from 'moment';
import { useMemo } from 'react';
import { InfoItem } from '../InfoItem';
import { Separator, SidebarInfoContent } from '../ProposalInfoCard.styled';
import { ProposalHistoryProps } from './ProposalHistory.types';

const ProposalHistory: React.FC<ProposalHistoryProps> = ({ proposal }) => {
  const endDetail = useMemo(() => {
    if (!proposal || !proposal.endTime) return null;

    const currentTime = moment();
    let prefix = proposal.endTime.isBefore(currentTime) ? 'Ended' : 'Ends';
    return `${prefix} ${proposal.endTime.fromNow()}`;
  }, [proposal]);

  return (
    <>
      <Separator />

      <SidebarInfoContent>
        {!proposal ? (
          <Loading loading text skeletonProps={{ height: '100px' }} />
        ) : (
          <>
            <InfoItem
              title="Proposal created"
              description={proposal.startTime.format('MMM Do, YYYY - h:mm a')}
            />
            <InfoItem
              title={endDetail}
              description={proposal.endTime.format('MMM Do, YYYY - h:mm a')}
            />
          </>
        )}
      </SidebarInfoContent>
    </>
  );
};

export default ProposalHistory;
