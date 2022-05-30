import moment from 'moment';
import { useMemo } from 'react';
import { Proposal, ContractState } from 'types/types.guilds.d';

export const useProposalState = (proposal: Proposal): ContractState => {
  const status = useMemo(() => {
    if (!proposal?.endTime) return null;
    switch (proposal.contractState) {
      case ContractState.Active:
        const currentTime = moment();
        if (currentTime.isSameOrAfter(proposal.endTime)) {
          return ContractState.Failed;
        } else {
          return ContractState.Active;
        }
      case ContractState.Executed:
        return ContractState.Executed;
      case ContractState.Rejected:
        return ContractState.Rejected;
      case ContractState.Failed:
        return ContractState.Failed;
      default:
        return null;
    }
  }, [proposal]);

  return status;
};

export default useProposalState;

