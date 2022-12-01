import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useContractEvent, useContractRead } from 'wagmi';

export const useGuildProposalIds = (guildId: string) => {
  const { data, refetch, ...rest } = useContractRead({
    address: guildId,
    abi: BaseERC20Guild.abi,
    functionName: 'getProposalsIds',
  });

  useContractEvent({
    address: guildId,
    abi: BaseERC20Guild.abi,
    eventName: 'ProposalStateChanged',
    listener(node, label, eventDetails) {
      const newState = eventDetails.args[1].toNumber();
      if (newState === 1) refetch();
    },
  });

  return { data, refetch, ...rest };
};
