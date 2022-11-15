import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import { ContractState } from 'types/types.guilds.d';
import { getProposalStateFromEvent } from 'utils/event';
import { useContractEvent, useContractRead } from 'wagmi';

export const useGuildProposalIds = (guildId: string) => {
  const { data, refetch, ...rest } = useContractRead({
    addressOrName: guildId,
    contractInterface: BaseERC20GuildContract.abi,
    functionName: 'getProposalsIds',
  });

  useContractEvent({
    addressOrName: guildId,
    contractInterface: BaseERC20GuildContract.abi,
    eventName: 'ProposalStateChanged',
    listener(event) {
      const proposalState = getProposalStateFromEvent(event);
      if (proposalState === ContractState.Active) refetch();
    },
  });

  return { data, refetch, ...rest };
};
