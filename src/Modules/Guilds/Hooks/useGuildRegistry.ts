import { GuildRegistry } from 'contracts/ts-files/GuildsRegistry';
import useNetworkConfig from 'hooks/Guilds/useNetworkConfig';
import { useContractRead } from 'wagmi';

export const useGuildRegistry = (contractAddress?: string) => {
  const config = useNetworkConfig();
  return useContractRead({
    address: contractAddress || config?.contracts?.utils.guildRegistry,
    abi: GuildRegistry.abi,
    functionName: 'getGuildsAddresses',
  });
};
