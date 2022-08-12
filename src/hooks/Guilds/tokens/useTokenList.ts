import { useMemo } from 'react';
import { TokenInfo, TokenList } from '@uniswap/token-lists';
import useIPFSFile from '../ipfs/useIPFSFile';
import useNetworkConfig from 'hooks/Guilds/useNetworkConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { getChainIcon } from 'utils';
import { useNetwork } from 'wagmi';

// TODO: Update to the DXgov curated token list once its ready
const SWAPR_TOKEN_LIST = 'QmSbyVo6Kz5BuqyAHYcN7UkeCk5cALFp6QmPUN6NtPpDWL';

export enum TokenType {
  NATIVE = 'NATIVE',
  ERC20 = 'ERC20',
}

export type TokenInfoWithType = TokenInfo & { type: TokenType };

export const useTokenList = (
  chainId?: number,
  includeNativeToken: boolean = false
) => {
  const tokenList = useIPFSFile<TokenList>(SWAPR_TOKEN_LIST);
  const { chainName } = useTypedParams();
  const config = useNetworkConfig(chainId);
  const { chains } = useNetwork();
  const tokens = useMemo(() => {
    let list: TokenInfoWithType[] =
      tokenList.data?.tokens?.map(token => ({
        ...token,
        type: TokenType.ERC20,
      })) || [];

    if (chainId) {
      list = list.filter(token => token.chainId === chainId);
    }
    if (
      (chainName === 'localhost' || chainName === 'goerli') &&
      config?.tokens
    ) {
      // for localhost, we add the tokens from local config file
      config?.tokens?.forEach(token => {
        list.push({
          ...token,
          chainId,
          type: TokenType.ERC20,
        });
      });
    }

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, tokenList]);

  const nativeToken: TokenInfoWithType = useMemo(() => {
    const chain = chains.find(chain => chain?.id === chainId);
    if (includeNativeToken && chain?.nativeCurrency) {
      return {
        type: TokenType.NATIVE,
        name: chain.nativeCurrency?.name,
        symbol: chain.nativeCurrency?.symbol,
        address: null,
        chainId: chain.id,
        decimals: chain.nativeCurrency?.decimals,
        logoURI: `${window.location.origin}${getChainIcon(chain.id)}`,
      };
    }

    return null;
  }, [chains, chainId, includeNativeToken]);

  return { tokens: nativeToken ? [...tokens, nativeToken] : tokens };
};
