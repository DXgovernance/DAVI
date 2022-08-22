import useEtherSWR from '../useEtherSWR';
import ERC20 from 'contracts/ERC20.json';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { TokenInfo } from '@uniswap/token-lists';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { useNetwork } from 'wagmi';

export type TokenWithBalance = TokenInfo & { balance?: BigNumber };

export const useAllERC20Balances = (walletAddress: string) => {
  const { chain } = useNetwork();
  const { tokens } = useTokenList(chain?.id);
  const { data, ...rest } = useEtherSWR(
    tokens && tokens?.length > 0 && walletAddress
      ? tokens.map(token => [token.address, 'balanceOf', walletAddress])
      : [],
    {
      ABIs: new Map(tokens.map(token => [token.address, ERC20.abi])),
    }
  );

  const parsed: TokenWithBalance[] = useMemo(() => {
    if (!data) return tokens || undefined;

    return tokens
      .map((token, index) => ({
        ...token,
        balance: BigNumber.from(data[index]),
      }))
      .sort((a, b) => {
        if (a.balance && b.balance) {
          return a.balance.toBigInt() > b.balance.toBigInt() ? -1 : 1;
        }
        return 0;
      });
  }, [tokens, data]);

  return { data: parsed, ...rest };
};
