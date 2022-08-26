import { isAvailableOnENS } from 'hooks/Guilds/ens/utils';
import { useEnsAddress } from 'wagmi';
import { MAINNET_ID } from 'utils';

export default function useAddressFromENSName(
  ensName: string,
  chainId?: number
) {
  const supportedChainId = isAvailableOnENS(chainId) ? chainId : MAINNET_ID;
  const {
    data: ensAddress,
    isError,
    isLoading,
  } = useEnsAddress({
    name: ensName,
    chainId: supportedChainId,
  });
  return { ensAddress, isError, isLoading };
}
