import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MAX_UINT } from 'utils';
import { WriterHooksInteface } from 'stores/types';
import { useTransactions } from 'contexts/Guilds';
import { useERC20 } from 'hooks/Guilds/contracts/useContract';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';

type UseApproveTokensInterface = WriterHooksInteface['useApproveTokens'];

export const useApproveTokens: UseApproveTokensInterface = (
  tokenAddress: string
) => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();
  const tokenContract = useERC20(tokenAddress);
  const { data: tokenInfo } = useERC20Info(tokenAddress);

  const handleApproveTokens = useCallback(
    async (daoTokenVault: string, amount: string = MAX_UINT) => {
      createTransaction(
        t('approveTokenSpending', {
          tokenSymbol: tokenInfo?.symbol,
        }),
        async () => tokenContract?.approve(daoTokenVault, amount)
      );
    },
    [createTransaction, tokenContract, tokenInfo, t]
  );

  return handleApproveTokens;
};
