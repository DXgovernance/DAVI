import { unix } from 'moment';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
import { Proposal, ContractState, InitialProposal } from 'types/types.guilds.d';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';

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
  const { data, ...rest } = useContractRead({
    addressOrName: guildId,
    contractInterface: ERC20GuildContract.abi,
    functionName: 'getProposal',
    args: [proposalId],
  });
  const proposalData = data as unknown as InitialProposal;

  return {
    data: data
      ? formatterMiddleware({ ...proposalData, id: proposalId })
      : undefined,
    ...rest,
  };
};

export default useProposal;
