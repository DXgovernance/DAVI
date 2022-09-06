import GuildRegistry from 'contracts/GuildsRegistry.json';
import useNetworkConfig from 'hooks/Guilds/useNetworkConfig';
import { useContractRead } from 'wagmi';

export const useGuildRegistry = (contractAddress?: string) => {
  const config = useNetworkConfig();
  return useContractRead({
    addressOrName: contractAddress || config?.contracts?.utils.guildRegistry,
    contractInterface: GuildRegistry.abi,
    functionName: 'getGuildsAddresses',
  });
};
