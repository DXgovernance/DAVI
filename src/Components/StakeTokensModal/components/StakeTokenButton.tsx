import { useHistory, useLocation } from 'react-router-dom';
import { MAX_UINT } from 'utils';
import { formatUnits } from 'ethers/lib/utils';
import { ActionButton } from './StakeTokensForm.styled';
import { Loading } from '../../Primitives/Loading';
import { StakeTokenButtonProps } from '../types';

export const StakeTokenButton = ({
  isRepGuild,
  stakeAmount,
  token,
  guild,
  isStakeAmountValid,
  createTransaction,
}: StakeTokenButtonProps) => {
  const history = useHistory();
  const location = useLocation();

  const lockTokens = async () => {
    if (!isStakeAmountValid) return;

    createTransaction(
      `Lock ${formatUnits(stakeAmount, token?.info?.decimals)} ${
        token?.info?.symbol
      } tokens`,
      async () => guild?.contract?.lockTokens(stakeAmount)
    );
  };

  const approveTokenSpending = async () => {
    if (!isStakeAmountValid) return;

    createTransaction(
      `Approve ${token?.info?.symbol} token spending`,
      async () => token?.contract.approve(guild?.config?.tokenVault, MAX_UINT)
    );
  };

  return (
    <>
      {!isRepGuild ? (
        stakeAmount && token?.allowance?.gte(stakeAmount) ? (
          <ActionButton
            data-testid="lock-token-spending"
            disabled={!isStakeAmountValid}
            onClick={lockTokens}
          >
            Lock{' '}
            {token?.info?.symbol || (
              <Loading loading text skeletonProps={{ width: 10 }} />
            )}
          </ActionButton>
        ) : (
          <ActionButton
            disabled={!isStakeAmountValid}
            onClick={approveTokenSpending}
            data-testid="approve-token-spending"
          >
            Approve{' '}
            {token?.info?.symbol || (
              <Loading loading text skeletonProps={{ width: 10 }} />
            )}{' '}
            Spending
          </ActionButton>
        )
      ) : (
        <ActionButton
          onClick={() => history.push(location.pathname + '/proposalType')}
        >
          Mint Rep
        </ActionButton>
      )}
    </>
  );
};
