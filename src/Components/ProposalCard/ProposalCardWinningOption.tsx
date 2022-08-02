import { Option } from 'Components/ActionsBuilder/types';
import { Loading } from 'Components/Primitives/Loading';
import {
  ActionDetailsWrapper,
  OptionVotesAndLabelWrapper,
  WinningOptionWrapper,
} from './ProposalCard.styled';
import { getInfoLineView } from 'Components/ActionsBuilder/SupportedActions';
import UndecodableCallInfoLine from 'Components/ActionsBuilder/UndecodableCalls/UndecodableCallInfoLine';

interface ProposalCardWinningOptionProps {
  option: Option;
}

const ProposalCardWinningOption: React.FC<ProposalCardWinningOptionProps> = ({
  option,
}) => {
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

  const InfoLine = getInfoLineView(
    option?.decodedActions[0]?.decodedCall?.callType
  );

  return (
    <WinningOptionWrapper>
      <OptionVotesAndLabelWrapper>
        {option.votePercentage}% - {option.label}
      </OptionVotesAndLabelWrapper>
      <ActionDetailsWrapper>
        {!!InfoLine ? (
          <InfoLine
            decodedCall={option?.decodedActions[0]?.decodedCall}
            approveSpendTokens={option?.decodedActions[0]?.approval}
            compact
            noAvatar
          />
        ) : (
          <UndecodableCallInfoLine />
        )}
      </ActionDetailsWrapper>
    </WinningOptionWrapper>
  );
};

export default ProposalCardWinningOption;
