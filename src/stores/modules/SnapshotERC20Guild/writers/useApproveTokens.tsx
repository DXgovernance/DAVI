import { MAX_UINT } from 'utils';
import { useTransactions } from 'contexts/Guilds';
import { useERC20 } from 'hooks/Guilds/contracts/useContract';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { useCallback } from 'react';
import { WriterHooksInteface } from 'stores/types';

type UseApproveTokensInterface = WriterHooksInteface['useApproveTokens'];

export const useApproveTokens: UseApproveTokensInterface = (
  tokenAddress: string
) => {
  const { createTransaction } = useTransactions();
  const tokenContract = useERC20(tokenAddress);
  const { data: tokenInfo } = useERC20Info(tokenAddress);

  const handleApproveTokens = useCallback(
    async (daoTokenVault: string, amount: string = MAX_UINT) => {
      createTransaction(
        `Approve ${tokenInfo?.symbol} token spending`,
        async () => tokenContract?.approve(daoTokenVault, amount)
      );
    },
    [createTransaction, tokenContract, tokenInfo]
  );

  return handleApproveTokens;
};
