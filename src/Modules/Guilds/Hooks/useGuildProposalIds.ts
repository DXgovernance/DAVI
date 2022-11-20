import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import { useContractRead } from 'wagmi';

export const useGuildProposalIds = (guildId: string) => {
  return useContractRead({
    addressOrName: guildId,
    contractInterface: BaseERC20GuildContract.abi,
    functionName: 'getProposalsIds',
    watch: true,
  });
};
