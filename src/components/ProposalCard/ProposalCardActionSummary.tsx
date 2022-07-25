import { Loading } from 'components/Primitives/Loading';
import { getInfoLineView } from 'components/ActionsBuilder/SupportedActions';
import UndecodableCallInfoLine from 'components/ActionsBuilder/UndecodableCalls/UndecodableCallInfoLine';
import { DecodedAction } from 'components/ActionsBuilder/types';
import {
  ActionsWrapper,
  BorderedIconDetailWrapper,
  NotFoundActionWrapper,
} from 'components/ProposalCard/ProposalCard.styled';

interface ProposalCardActionSummaryProps {
  actions?: DecodedAction[];
}

const ProposalCardActionSummary: React.FC<ProposalCardActionSummaryProps> = ({
  actions,
}) => {
  const isLoading = !actions;
  if (isLoading) {
    return (
      <Loading
        style={{ margin: 0 }}
        loading
        text
        skeletonProps={{ width: '200px' }}
      />
    );
  }
  return (
    <ActionsWrapper>
      {actions?.map(action => {
        if (!action) return null;
        const InfoLine = getInfoLineView(action?.decodedCall?.callType);

        return !!InfoLine ? (
          <BorderedIconDetailWrapper key={action.id}>
            <InfoLine
              decodedCall={action?.decodedCall}
              approveSpendTokens={action?.approval}
              compact
            />
          </BorderedIconDetailWrapper>
        ) : (
          <NotFoundActionWrapper>
            <UndecodableCallInfoLine />
          </NotFoundActionWrapper>
        );
      })}
    </ActionsWrapper>
  );
};

export default ProposalCardActionSummary;
