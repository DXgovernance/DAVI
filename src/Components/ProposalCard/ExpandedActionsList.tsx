import { getInfoLineView } from 'Components/ActionsBuilder/SupportedActions';
import UndecodableCallInfoLine from 'Components/ActionsBuilder/UndecodableCalls/UndecodableCallInfoLine';
import {
  ActionNumber,
  ActionsTooltipWrapper,
  ActionWrapper,
  SpacerLine,
} from './ProposalCard.styled';

const ExpandedActionsList = ({ actions }) => {
  return (
    <ActionsTooltipWrapper>
      {actions.map((action, index) => {
        const InfoLine = getInfoLineView(action?.decodedCall?.callType);

        return (
          <>
            <ActionWrapper>
              <ActionNumber>{index + 1}</ActionNumber>
              {!!InfoLine ? (
                <InfoLine
                  decodedCall={action?.decodedCall}
                  approveSpendTokens={action?.approval}
                  noAvatar
                />
              ) : (
                <UndecodableCallInfoLine />
              )}
            </ActionWrapper>
            {index !== actions.length - 1 && <SpacerLine />}
          </>
        );
      })}
    </ActionsTooltipWrapper>
  );
};

export default ExpandedActionsList;
