import moment from 'moment';
import { Proposal, ContractState, ProposalState } from 'types/types.guilds.d';

export const useProposalState = (proposal: Proposal): ProposalState => {
  if (!proposal?.endTime) return null;
  switch (proposal.contractState) {
    case ContractState.Active:
      const currentTime = moment();

      if (currentTime.isSameOrAfter(proposal.endTime)) {
        return ProposalState.Executable;
      } else {
        return ProposalState.Active;
      }
    case ContractState.Executed:
      return ProposalState.Executed;
    case ContractState.Rejected:
      return ProposalState.Rejected;
    case ContractState.Failed:
      return ProposalState.Failed;
    default:
      return null;
  }
};

export default useProposalState;
