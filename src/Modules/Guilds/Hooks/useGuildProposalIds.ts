import ERC20GuildContract from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';

export const useGuildProposalIds = (guildId: string) => {
  return useContractRead({
    addressOrName: guildId,
    contractInterface: ERC20GuildContract.abi,
    functionName: 'getProposalsIds',
    watch: true,
  });
};
