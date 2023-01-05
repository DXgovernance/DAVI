import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BigNumber } from 'ethers';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { formatUnits } from 'ethers/lib/utils';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';

type UseWithdrawTokens = WriterHooksInteface['useWithdrawTokens'];

export const useWithdrawTokens: UseWithdrawTokens = (guildAddress: string) => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();
  const guildContract = useERC20Guild(guildAddress);

  const withdrawTokens = useCallback(
    async (amount: BigNumber, decimals?: number, symbol?: string) => {
      const formattedAmount = decimals
        ? ` ${formatUnits(amount, decimals)}`
        : '';

      createTransaction(
        t('unlockAndWithdrawTokens', {
          amount: formattedAmount,
          symbol: symbol ?? '',
        }),
        async () => guildContract.withdrawTokens(amount)
      );
    },
    [guildContract, createTransaction, t]
  );

  return withdrawTokens;
};
