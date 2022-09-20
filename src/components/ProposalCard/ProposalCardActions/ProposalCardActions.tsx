import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { HiOutlinePencil } from 'react-icons/hi';
import { ProposalCardActionsWrapper } from './ProposalCardActions.styled';

const ProposalCardActions = ({
  votesOfVoters,
  proposalCreated,
  userAddress,
}) => {
  const isCreator = proposalCreated === userAddress;
  const hasVoted =
    votesOfVoters?.action !== null && votesOfVoters?.votingPower !== null;
  return (
    <ProposalCardActionsWrapper>
      {hasVoted ? <IoMdCheckmarkCircleOutline size={30} /> : null}
      {isCreator ? <HiOutlinePencil size={30} /> : null}
    </ProposalCardActionsWrapper>
  );
};

export default ProposalCardActions;
