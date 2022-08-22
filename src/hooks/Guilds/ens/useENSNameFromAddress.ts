import { useEnsName } from 'wagmi';
import { isSupportedChainId } from 'Components/ActionsBuilder/SupportedActions/UpdateENSContent/utils';

export default function useENSNameFromAddress(
  ensAddress?: string,
  chainId?: number
) {
  const supportedChainId = isSupportedChainId(chainId);
  const {
    data: ensName,
    isLoading,
    isError,
  } = useEnsName({
    address: ensAddress,
    chainId: supportedChainId,
  });

  return {
    ensName,
    isLoading,
    isError,
  };
}
