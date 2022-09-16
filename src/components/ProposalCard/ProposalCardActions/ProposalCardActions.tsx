import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { HiOutlinePencil } from 'react-icons/hi';
import { ProposalCardActionsWrapper } from './ProposalCardActions.styled';

const ProposalCardActions = ({ votesOfVoters, created, userAddress }) => {
  const isCreator = created === userAddress;
  const hasVoted = votesOfVoters?.action !== null;
  return (
    <ProposalCardActionsWrapper>
      {hasVoted ? <IoMdCheckmarkCircleOutline size={30} /> : null}
      {isCreator ? <HiOutlinePencil size={30} /> : null}
    </ProposalCardActionsWrapper>
  );
};

export default ProposalCardActions;
