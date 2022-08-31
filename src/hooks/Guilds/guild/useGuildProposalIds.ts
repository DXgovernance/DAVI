import ERC20GuildContract from 'contracts/ERC20Guild.json';
import { useContractRead } from 'wagmi';

export const useGuildProposalIds = (guildId: string) => {
  const { data, ...rest } = useContractRead({
    addressOrName: guildId,
    contractInterface: ERC20GuildContract.abi,
    functionName: 'getProposalsIds',
  });
  return { data, ...rest };
};
