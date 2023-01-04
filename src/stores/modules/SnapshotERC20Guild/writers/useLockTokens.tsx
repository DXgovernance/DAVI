import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useTransactions } from 'contexts/Guilds';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { useCallback } from 'react';
import { WriterHooksInteface } from 'stores/types';

type UseLockTokensInterface = WriterHooksInteface['useLockTokens'];

export const useLockTokens: UseLockTokensInterface = (guildAddress: string) => {
  const { createTransaction } = useTransactions();
  const guildContract = useERC20Guild(guildAddress);

  const handleCreateTransaction = useCallback(
    async (
      stakeAmount: BigNumber,
      decimals: number = 18,
      symbol: string = ''
    ) => {
      createTransaction(
        `Locking ${formatUnits(stakeAmount, decimals)} ${symbol} tokens`,
        async () => guildContract?.lockTokens(stakeAmount)
      );
    },
    [createTransaction, guildContract]
  );

  return handleCreateTransaction;
};
