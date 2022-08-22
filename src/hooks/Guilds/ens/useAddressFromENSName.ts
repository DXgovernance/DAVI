import { useEnsAddress } from 'wagmi';

export default function useAddressFromENSName(
  ensName: string,
  chainId?: number
) {
  const {
    data: ensAddress,
    isError,
    isLoading,
  } = useEnsAddress({
    name: ensName,
    chainId,
  });
  return { ensAddress, isError, isLoading };
}
