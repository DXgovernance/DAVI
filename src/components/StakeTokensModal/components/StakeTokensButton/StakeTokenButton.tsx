import { useNavigate } from 'react-router-dom';
import { MAX_UINT } from 'utils';
import { formatUnits } from 'ethers/lib/utils';
import { ActionButton } from '../StakeTokensForm/StakeTokensForm.styled';
import { Loading } from 'components/primitives/Loading';
import { StakeTokenButtonProps } from '../../types';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
const StakeTokensButton = ({
  isRepGuild,
  stakeAmount,
  token,
  guild,
  isStakeAmountValid,
  createTransaction,
}: StakeTokenButtonProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [approvedTokenAllowance, setApprovedTokenAllowance] = useState(false);
  useEffect(() => {
    if (stakeAmount) {
      if (token?.allowance?.gte(stakeAmount) && token?.allowance?.gt(0)) {
        setApprovedTokenAllowance(true);
      }
    }
  }, [token, stakeAmount, approvedTokenAllowance]);
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
        stakeAmount && approvedTokenAllowance ? (
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
            {t('approve')}{' '}
            {token?.info?.symbol || (
              <Loading loading text skeletonProps={{ width: 10 }} />
            )}{' '}
            {t('spending')}
          </ActionButton>
        )
      ) : (
        <ActionButton onClick={() => navigate('proposalType')}>
          {t('mintRep')}
        </ActionButton>
      )}
    </>
  );
};

export default StakeTokensButton;
