import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { HiOutlinePencil } from 'react-icons/hi';
import { ProposalCardActionsWrapper } from './ProposalCardActions.styled';
import { useMemo } from 'react';
import { ProposalCardActionsProps } from './types';

const ProposalCardActions = ({
  votesOfVoters,
  proposalCreator,
  userAddress,
}: ProposalCardActionsProps) => {
  const isCreator = useMemo(
    () => proposalCreator === userAddress,
    [userAddress, proposalCreator]
  );
  const hasVoted = useMemo(
    () => votesOfVoters?.action !== null && votesOfVoters?.votingPower !== null,
    [votesOfVoters?.votingPower, votesOfVoters?.action]
  );

  return (
    <ProposalCardActionsWrapper>
      {hasVoted ? <IoMdCheckmarkCircleOutline size={20} /> : null}
      {isCreator ? <HiOutlinePencil size={20} /> : null}
    </ProposalCardActionsWrapper>
  );
};

export default ProposalCardActions;
