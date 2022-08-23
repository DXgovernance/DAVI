import { useContractRead } from 'wagmi';
import ensPublicResolverABI from 'abis/ENSPublicResolver.json';
import {
  convertToIpfsHash,
  convertToNameHash,
  isAvailableOnENS,
} from 'Components/ActionsBuilder/SupportedActions/UpdateENSContent/utils';
import useENSResolver from './useENSResolver';
import { MAINNET_ID } from 'utils';

/**
 * @dev This file contains all the functions contained in the ENS Public Resolver contract: https://docs.ens.domains/contract-api-reference/publicresolver
 */

export function useENSAvatarUri(ensName: string, chainId?: number) {
  const supportedChainId = isAvailableOnENS(chainId) ? chainId : MAINNET_ID;
  const { resolver } = useENSResolver(ensName, supportedChainId);
  const { data, isError, isLoading } = useContractRead({
    addressOrName: resolver?.address,
    contractInterface: ensPublicResolverABI,
    functionName: 'text',
    args: [convertToNameHash(ensName), 'avatar'],
  });
  return {
    avatarUri: data?.toString(),
    isError,
    isLoading,
  };
}

export function useENSContentHash(ensName: string, chainId?: number) {
  const supportedChainId = isAvailableOnENS(chainId) ? chainId : MAINNET_ID;
  const { resolver, isError, isLoading } = useENSResolver(
    ensName,
    supportedChainId
  );
  const { data } = useContractRead({
    addressOrName: resolver?.address,
    contractInterface: ensPublicResolverABI,
    functionName: 'contenthash',
    args: convertToNameHash(ensName),
    select(data) {
      return convertToIpfsHash(data.toString());
    },
  });
  return {
    ipfsHash: data?.toString(),
    isLoading,
    isError,
  };
}
