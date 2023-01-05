import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';

type UseLockTokensInterface = WriterHooksInteface['useLockTokens'];

export const useLockTokens: UseLockTokensInterface = (guildAddress: string) => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();
  const guildContract = useERC20Guild(guildAddress);

  const handleCreateTransaction = useCallback(
    async (amount: BigNumber, decimals?: number, symbol?: string) => {
      const formattedAmount = decimals
        ? ` ${formatUnits(amount, decimals)}`
        : '';

      createTransaction(
        t('lockingTokens', { amount: formattedAmount, symbol: symbol ?? '' }),
        async () => guildContract?.lockTokens(amount)
      );
    },
    [createTransaction, guildContract, t]
  );

  return handleCreateTransaction;
};
