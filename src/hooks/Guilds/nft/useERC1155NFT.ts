import { resolveUri } from 'utils/url';
import { ERC1155 } from 'contracts/ts-files/ERC1155';
import { useContractReads } from 'wagmi';
import { BigNumber } from 'ethers';

export default function useERC1155NFT(
  contractId: string,
  tokenId: string,
  ownerAddress: `0x${string}`,
  chainId?: number
) {
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        enabled: tokenId && contractId,
        address: contractId,
        abi: ERC1155.abi,
        functionName: 'balanceOf',
        chainId,
        args: [ownerAddress, BigNumber.from(tokenId ? tokenId : '0')],
      },
      {
        enabled: tokenId && contractId,
        address: contractId,
        abi: ERC1155.abi,
        functionName: 'uri',
        chainId,
        args: [BigNumber.from(tokenId ? tokenId : '0')],
      },
    ],
  });

  if (!data || data.every(v => v === null)) {
    return { data: undefined, isError, isLoading };
  }
  const [balanceOf, tokenURI] = data;
  const resolvedTokenUri = resolveUri(tokenURI?.toString());

  return {
    balance: balanceOf,
    resolvedTokenUri,
    isError,
    isLoading,
  };
}
