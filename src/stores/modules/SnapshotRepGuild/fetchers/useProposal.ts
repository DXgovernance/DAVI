import { unix } from 'moment';
import { Proposal, ContractState, InitialProposal } from 'types/types.guilds.d';
import { useContractEvent, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';

const formatterMiddleware = (data: InitialProposal): Proposal => {
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

const useProposal = (guildId: string, proposalId: `0x${string}`) => {
  const { data, refetch, ...rest } = useContractRead({
    address: guildId,
    abi: SnapshotERC20Guild.abi,
    functionName: 'getProposal',
    args: [proposalId],
  });
  const proposalData = data as unknown as InitialProposal;

  useContractEvent({
    address: guildId,
    abi: SnapshotERC20Guild.abi,
    eventName: 'ProposalStateChanged',
    listener(node, label, eventDetails) {
      const eventProposalId = eventDetails.args[0];
      if (eventProposalId === proposalId) refetch();
    },
  });

  useContractEvent({
    address: guildId,
    abi: SnapshotERC20Guild.abi,
    eventName: 'VoteAdded',
    listener(node, label, eventDetails) {
      if (node === proposalId) refetch();
    },
  });

  return {
    data: data
      ? formatterMiddleware({ ...proposalData, id: proposalId })
      : undefined,
    refetch,
    ...rest,
  };
};

export default useProposal;
