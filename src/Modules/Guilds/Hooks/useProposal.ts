import { unix } from 'moment';
import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import { Proposal, ContractState, InitialProposal } from 'types/types.guilds.d';
import { useContractEvent, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { getProposalIdFromEvent } from 'utils/event';

export const formatterMiddleware = (data: InitialProposal): Proposal => {
  const clone = { ...data };

  const contractStatesMapping = {
    1: ContractState.Active,
    2: ContractState.Rejected,
    3: ContractState.Executed,
    4: ContractState.Failed,
  };
  clone.contractState = contractStatesMapping[clone.state];
  //we are removing the clone.state key
  delete clone.state;

  if (data.startTime instanceof BigNumber) {
    clone.startTime = data.startTime ? unix(data.startTime.toNumber()) : null;
  }
  if (data.endTime instanceof BigNumber) {
    clone.endTime = data.endTime ? unix(data.endTime.toNumber()) : null;
  }

  return clone as Proposal;
};

const useProposal = (guildId: string, proposalId: string) => {
  const { data, refetch, ...rest } = useContractRead({
    addressOrName: guildId,
    contractInterface: BaseERC20GuildContract.abi,
    functionName: 'getProposal',
    args: proposalId,
  });
  const proposalData = data as unknown as InitialProposal;

  useContractEvent({
    addressOrName: guildId,
    contractInterface: BaseERC20GuildContract.abi,
    eventName: 'ProposalStateChanged',
    listener(event) {
      const eventProposalId = getProposalIdFromEvent(event);
      if (proposalId === eventProposalId) refetch();
    },
  });

  useContractEvent({
    addressOrName: guildId,
    contractInterface: BaseERC20GuildContract.abi,
    eventName: 'VoteAdded',
    listener(event) {
      const eventProposalId = getProposalIdFromEvent(event);
      if (proposalId === eventProposalId) refetch();
    },
  });

  return {
    data: data
      ? formatterMiddleware({ ...proposalData, id: proposalId })
      : undefined,
    ...rest,
  };
};

export default useProposal;
