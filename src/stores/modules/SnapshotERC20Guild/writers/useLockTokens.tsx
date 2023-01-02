import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useTransactions } from 'contexts/Guilds';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';

export const useLockTokens = (
  guildAddress: string,
  stakeAmount: BigNumber,
  decimals: number = 18,
  symbol: string = ''
) => {
  const { createTransaction } = useTransactions();
  const guildContract = useERC20Guild(guildAddress);

  const handleCreateTransaction = async () => {
    createTransaction(
      `Locking ${formatUnits(stakeAmount, decimals)} ${symbol} tokens`,
      async () => guildContract?.lockTokens(stakeAmount)
    );
  };

  return handleCreateTransaction;
};
