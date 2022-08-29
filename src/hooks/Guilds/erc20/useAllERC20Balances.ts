import ERC20ABI from 'abis/ERC20.json';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import {
  TokenInfoWithType,
  TokenType,
  useTokenList,
} from 'hooks/Guilds/tokens/useTokenList';
import { useBalance, useContractReads, useNetwork } from 'wagmi';

export type TokenWithBalance = TokenInfoWithType & {
  balance?: BigNumber;
};

export const useAllERC20Balances = (
  walletAddress: string,
  includeNativeToken?: boolean
) => {
  const { chain } = useNetwork();
  const { tokens } = useTokenList(chain?.id, includeNativeToken);

  // Get ERC20 Balances
  const erc20Tokens = useMemo(
    () => tokens.filter(token => token.type === TokenType.ERC20),
    [tokens]
  );
  const { data: erc20Balances, ...rest } = useContractReads({
    enabled: erc20Tokens?.length > 0 && !!walletAddress,
    contracts: erc20Tokens.map(token => ({
      addressOrName: token.address,
      contractInterface: ERC20ABI,
      functionName: 'balanceOf',
      args: [walletAddress],
    })),
  });
  const erc20TokensWithBalance: TokenWithBalance[] = useMemo(() => {
    if (!erc20Balances) return null;

    return erc20Tokens.map((token, index) => ({
      ...token,
      balance: BigNumber.from(erc20Balances[index]),
    }));
  }, [erc20Balances, erc20Tokens]);

  // Get Native token balance
  const { data: nativeTokenBalance } = useBalance({
    addressOrName: walletAddress,
  });
  const nativeTokenWithBalance = useMemo(() => {
    if (!nativeTokenBalance) return null;

    const nativeToken: TokenWithBalance = tokens.find(
      token => token.type === TokenType.NATIVE
    );
    if (!nativeToken) return null;

    nativeToken.balance = nativeTokenBalance?.value;
    return nativeToken;
  }, [tokens, nativeTokenBalance]);

  // Combine and sort balances
  const parsed: TokenWithBalance[] = useMemo(() => {
    if (!erc20TokensWithBalance) return tokens || undefined;

    const tokensWithBalances = nativeTokenWithBalance
      ? [...erc20TokensWithBalance, nativeTokenWithBalance]
      : erc20TokensWithBalance;

    return tokensWithBalances.sort((a, b) => {
      if (a.balance && b.balance) {
        return a.balance.toBigInt() > b.balance.toBigInt() ? -1 : 1;
      }
      return 0;
    });
  }, [tokens, erc20TokensWithBalance, nativeTokenWithBalance]);
  return { data: parsed, ...rest };
};
