import { isAvailableOnENS } from 'hooks/Guilds/ens/utils';
import { MAINNET_ID } from 'utils';
import { useEnsResolver } from 'wagmi';

export default function useENSResolver(ensName: string, chainId?: number) {
  const supportedChainId = isAvailableOnENS(chainId) ? chainId : MAINNET_ID;
  const {
    data: resolver,
    isError,
    isLoading,
  } = useEnsResolver({
    name: ensName,
    chainId: supportedChainId,
  });
  return {
    resolver,
    isError,
    isLoading,
  };
}
