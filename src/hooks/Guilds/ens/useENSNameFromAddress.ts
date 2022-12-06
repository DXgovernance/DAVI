import { useEnsName } from 'wagmi';
import { isAvailableOnENS } from './utils';
import { MAINNET_ID } from 'utils';

export default function useENSNameFromAddress(
  ensAddress?: `0x${string}`,
  chainId?: number
) {
  const supportedChainId = isAvailableOnENS(chainId) ? chainId : MAINNET_ID;
  const { data: ensName, ...rest } = useEnsName({
    address: ensAddress,
    chainId: supportedChainId,
  });

  return {
    ensName,
    ...rest,
  };
}
