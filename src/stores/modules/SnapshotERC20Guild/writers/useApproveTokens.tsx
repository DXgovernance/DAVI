import { MAX_UINT } from 'utils';
import { useTransactions } from 'contexts/Guilds';
import { useERC20 } from 'hooks/Guilds/contracts/useContract';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';

export const useApproveTokens = (
  tokenAddress: string,
  daoTokenVault: string,
  amount: string = MAX_UINT
) => {
  const { createTransaction } = useTransactions();
  const tokenContract = useERC20(tokenAddress);
  const { data: tokenInfo } = useERC20Info(tokenAddress);

  const handleApproveTokens = async () => {
    createTransaction(`Approve ${tokenInfo?.symbol} token spending`, async () =>
      tokenContract?.approve(daoTokenVault, amount)
    );
  };

  return handleApproveTokens;
};
