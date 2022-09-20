import { getInfoLineView } from 'components/ActionsBuilder/SupportedActions';
import UndecodableCallInfoLine from 'components/ActionsBuilder/UndecodableCalls/UndecodableCallInfoLine';
import { Fragment } from 'react';
import {
  ActionNumber,
  ActionsTooltipWrapper,
  ActionWrapper,
  SpacerLine,
} from './ExpandedActionsList.styled';
import { ExpandedActionsListProps } from './types';

const ExpandedActionsList: React.FC<ExpandedActionsListProps> = ({
  option,
}) => {
  return (
    <ActionsTooltipWrapper aria-label={'expanded actions list tooltip'}>
      {option?.actions.map((action, index) => {
        const decodedAction = option?.decodedActions[index];

        let InfoLine = getInfoLineView(decodedAction?.decodedCall?.callType);

        return (
          <Fragment key={decodedAction?.id || index}>
            <ActionWrapper>
              <ActionNumber>{index + 1}</ActionNumber>
              {!!InfoLine ? (
                <InfoLine
                  decodedCall={decodedAction?.decodedCall}
                  approveSpendTokens={decodedAction.approval}
                  noAvatar
                  compact
                />
              ) : (
                <UndecodableCallInfoLine call={action} />
              )}
            </ActionWrapper>
            {index !== option?.actions.length - 1 && <SpacerLine />}
          </Fragment>
        );
      })}
    </ActionsTooltipWrapper>
  );
};

export default ExpandedActionsList;
