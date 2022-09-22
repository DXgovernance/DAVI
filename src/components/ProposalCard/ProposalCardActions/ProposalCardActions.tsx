import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { HiOutlinePencil } from 'react-icons/hi';
import { ProposalCardActionsWrapper } from './ProposalCardActions.styled';
import { useMemo } from 'react';
import { ProposalCardActionsProps } from './types';

const ProposalCardActions = ({
  votesOfVoter,
  proposalCreator,
  userAddress,
}: ProposalCardActionsProps) => {
  const isCreator = useMemo(
    () => proposalCreator === userAddress,
    [userAddress, proposalCreator]
  );
  const hasVoted = useMemo(
    () => votesOfVoter?.action !== null && votesOfVoter?.votingPower !== null,
    [votesOfVoter?.votingPower, votesOfVoter?.action]
  );

  return (
    <ProposalCardActionsWrapper>
      {hasVoted ? <IoMdCheckmarkCircleOutline size={20} /> : null}
      {isCreator ? <HiOutlinePencil size={20} /> : null}
    </ProposalCardActionsWrapper>
  );
};

export default ProposalCardActions;
