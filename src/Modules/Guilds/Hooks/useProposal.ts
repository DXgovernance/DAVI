import { unix } from 'moment';
import { Proposal, ContractState, InitialProposal } from 'types/types.guilds.d';
import { useContractEvent, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { Context, createContext, useContext } from 'react';

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

const useProposalRpc = (guildId: string, proposalId: `0x${string}`) => {
  const { data, refetch, ...rest } = useContractRead({
    address: guildId,
    abi: BaseERC20Guild.abi,
    functionName: 'getProposal',
    args: [proposalId],
  });
  const proposalData = data as unknown as InitialProposal;

  console.log('using useProposalRpc');

  return {
    refetch,
    data: data
      ? formatterMiddleware({ ...proposalData, id: proposalId })
      : undefined,
    ...rest,
  };
};

const useProposalSubgraph = (guildId: string, proposalId: `0x${string}`) => {
  const { data, refetch, ...rest } = useContractRead({
    address: guildId,
    abi: BaseERC20Guild.abi,
    functionName: 'getProposal',
    args: [proposalId],
  });
  const proposalData = data as unknown as InitialProposal;

  console.log('using useProposalSubgraph');

  return {
    refetch,
    data: data
      ? formatterMiddleware({ ...proposalData, id: proposalId })
      : undefined,
    ...rest,
  };
};

// from here

interface HookStoreInterface {
  useProposal: (
    guildId: string,
    proposalId: `0x${string}`
  ) => {
    data?: Proposal;
    error?: Error;
    isIdle: boolean;
    isLoading: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isRefetching: boolean;
    refetch: any;
  };
}

const rpcHookStore: HookStoreInterface = {
  useProposal: useProposalRpc,
};

const subgraphHookStore: HookStoreInterface = {
  useProposal: useProposalSubgraph,
};

let HookStoreContext: Context<HookStoreInterface>;

const useDataSource = () => {
  //change someValidation to test each hookStore, the difference is on a console.log
  const someValidation = false;

  if (someValidation) {
    HookStoreContext = createContext<HookStoreInterface>(rpcHookStore);
  } else {
    HookStoreContext = createContext<HookStoreInterface>(subgraphHookStore);
  }

  const useHookStore = () => useContext(HookStoreContext);

  const store = useHookStore();

  return store;
};

// to here
// should go on an upper level folder.

const useProposal = (guildId: string, proposalId: `0x${string}`) => {
  const store = useDataSource();
  const { refetch, data, ...rest } = store.useProposal(guildId, proposalId);

  useContractEvent({
    address: guildId,
    abi: BaseERC20Guild.abi,
    eventName: 'ProposalStateChanged',
    listener(node, label, eventDetails) {
      const eventProposalId = eventDetails.args[0];
      if (eventProposalId === proposalId) refetch();
    },
  });

  useContractEvent({
    address: guildId,
    abi: BaseERC20Guild.abi,
    eventName: 'VoteAdded',
    listener(node, label, eventDetails) {
      if (node === proposalId) refetch();
    },
  });

  return {
    data,
    ...rest,
  };
};

export default useProposal;
