import { useMemo } from 'react';
import { resolveUri } from '../../../../utils/url';
import ERC721abi from '../../../../abis/ERC721.json';
import useEtherSWR from '../useEtherSWR';
import useSWR from 'swr';
import { useProvider } from 'wagmi';

type ERC721Data = {
  ownerOf: string;
  tokenURI: string;
};

export default function useERC721NFT(
  contractId: string,
  tokenId: string,
  chainId?: number
) {
  const provider = useProvider();
  const { data: result } = useEtherSWR(
    contractId
      ? [
          [contractId, 'ownerOf', tokenId],
          [contractId, 'tokenURI', tokenId],
        ]
      : [],
    {
      web3Provider: provider,
      ABIs: new Map([[contractId, ERC721abi]]),
      refreshInterval: 0,
    }
  );

  const nftData: ERC721Data = useMemo(() => {
    if (!result) return undefined;

    const [ownerOf, tokenURI] = result;
    return {
      ownerOf,
      tokenURI: resolveUri(tokenURI),
    };
  }, [result]);

  const { data: metadata } = useSWR(nftData?.tokenURI || null);

  return { ownerAddress: nftData?.ownerOf, metadata };
}
