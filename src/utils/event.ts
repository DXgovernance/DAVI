import { ContractState } from 'types/types.guilds.d';

export const getProposalIdFromEvent = (event): string => {
  if (!event || !event.length) return null;

  const params = event[event.length - 1].args;
  return params.proposalId;
};

export const getProposalStateFromEvent = (event): ContractState => {
  if (!event || !event.length) return null;

  const params = event[event.length - 1].args;
  const stateNumber = params.newState.toNumber();

  const contractStatesMapping = {
    1: ContractState.Active,
    2: ContractState.Rejected,
    3: ContractState.Executed,
    4: ContractState.Failed,
  };

  return contractStatesMapping[stateNumber];
};

export const getVoterFromEvent = (event): string => {
  if (!event || !event.length) return null;

  const params = event[event.length - 1].args;
  return params.voter;
};
