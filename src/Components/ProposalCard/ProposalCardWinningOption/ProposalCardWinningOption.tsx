import { Loading } from 'Components/Primitives/Loading';
import {
  ActionCount,
  ActionCountWrapper,
  ActionDetailsButton,
  OptionVotesAndLabelWrapper,
  WinningOptionWrapper,
} from './ProposalCardWinningOption.styled';
import { getInfoLineView } from 'Components/ActionsBuilder/SupportedActions';
import UndecodableCallInfoLine from 'Components/ActionsBuilder/UndecodableCalls/UndecodableCallInfoLine';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExpandedActionsList } from '../ExpandedActionsList';
import { ProposalCardWinningOptionProps } from './types';

const ProposalCardWinningOption: React.FC<ProposalCardWinningOptionProps> = ({
  option,
}) => {
  const [expandedActionsVisible, setExpandedActionsVisible] = useState(false);
  const { t } = useTranslation();

  if (!option) {
    return (
      <Loading
        style={{ margin: 0 }}
        loading
        text
        skeletonProps={{ width: '200px' }}
      />
    );
  }

  const firstAction = option?.decodedActions[0];
  const allActions = option?.decodedActions;
  const numberOfActions = allActions?.length;

  const handleExpandActions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (numberOfActions > 1) setExpandedActionsVisible(!expandedActionsVisible);
  };

  const InfoLine = getInfoLineView(firstAction?.decodedCall?.callType);

  return (
    <WinningOptionWrapper>
      <OptionVotesAndLabelWrapper>
        {option.votePercentage !== null ? (
          <>
            {option.votePercentage}% - {option.label}
          </>
        ) : (
          <Loading
            style={{ margin: 0 }}
            loading
            text
            skeletonProps={{ width: '70px' }}
          />
        )}
      </OptionVotesAndLabelWrapper>

      <ActionDetailsButton
        onClick={handleExpandActions}
        isClickable={numberOfActions > 1}
        aria-label={'action details button'}
      >
        {numberOfActions === 1 ? (
          !!InfoLine ? (
            <InfoLine
              decodedCall={firstAction?.decodedCall}
              approveSpendTokens={firstAction?.approval}
              compact
              noAvatar
            />
          ) : (
            <UndecodableCallInfoLine />
          )
        ) : (
          <ActionCountWrapper>
            <ActionCount>{numberOfActions}</ActionCount> {t('actions_other')}
          </ActionCountWrapper>
        )}

        {expandedActionsVisible && <ExpandedActionsList actions={allActions} />}
      </ActionDetailsButton>
    </WinningOptionWrapper>
  );
};

export default ProposalCardWinningOption;
