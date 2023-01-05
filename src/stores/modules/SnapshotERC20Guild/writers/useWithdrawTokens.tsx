import { useCallback } from 'react';
import { useTransactions } from 'contexts/Guilds';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { formatUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import { WriterHooksInteface } from 'stores/types';

type UseWithdrawTokens = WriterHooksInteface['useWithdrawTokens'];

export const useWithdrawTokens: UseWithdrawTokens = (guildAddress: string) => {
  const { createTransaction } = useTransactions();
  const guildContract = useERC20Guild(guildAddress);

  const withdrawTokens = useCallback(
    async (amount: BigNumber, tokenDecimals?: number, tokenSymbol?: string) => {
      const formattedAmount = tokenDecimals
        ? ` ${formatUnits(amount, tokenDecimals)}`
        : '';

      createTransaction(
        `Unlock and withdraw${formattedAmount} ${tokenSymbol ?? ''} tokens`,
        async () => guildContract.withdrawTokens(amount)
      );
    },
    [guildContract, createTransaction]
  );

  return withdrawTokens;
};
