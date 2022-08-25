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
  actions,
}) => {
  return (
    <ActionsTooltipWrapper aria-label={'expanded actions list tooltip'}>
      {actions.map((action, index) => {
        const InfoLine = getInfoLineView(action?.decodedCall?.callType);

        return (
          <Fragment key={action.id}>
            <ActionWrapper>
              <ActionNumber>{index + 1}</ActionNumber>
              {!!InfoLine ? (
                <InfoLine
                  decodedCall={action?.decodedCall}
                  approveSpendTokens={action?.approval}
                  noAvatar
                  compact
                />
              ) : (
                <UndecodableCallInfoLine />
              )}
            </ActionWrapper>
            {index !== actions.length - 1 && <SpacerLine />}
          </Fragment>
        );
      })}
    </ActionsTooltipWrapper>
  );
};

export default ExpandedActionsList;
