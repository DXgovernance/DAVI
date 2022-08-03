import { getInfoLineView } from 'Components/ActionsBuilder/SupportedActions';
import { DecodedAction } from 'Components/ActionsBuilder/types';
import UndecodableCallInfoLine from 'Components/ActionsBuilder/UndecodableCalls/UndecodableCallInfoLine';
import {
  ActionNumber,
  ActionsTooltipWrapper,
  ActionWrapper,
  SpacerLine,
} from './ExpandedActionsList.styled';

interface ExpandedActionsListProps {
  actions: DecodedAction[];
}

const ExpandedActionsList: React.FC<ExpandedActionsListProps> = ({
  actions,
}) => {
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
