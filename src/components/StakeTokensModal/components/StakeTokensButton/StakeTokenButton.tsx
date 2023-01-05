import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loading } from 'components/primitives/Loading';
import { ActionButton } from '../StakeTokensForm/StakeTokensForm.styled';
import { StakeTokenButtonProps } from '../../types';
import { useHookStoreProvider } from 'stores';
const StakeTokensButton = ({
  isRepGuild,
  stakeAmount,
  token,
  guild,
  isStakeAmountValid,
}: StakeTokenButtonProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [approvedTokenAllowance, setApprovedTokenAllowance] = useState(false);

  const {
    hooks: {
      writers: { useLockTokens, useApproveTokens },
    },
    daoId,
  } = useHookStoreProvider();

  const lockTokens = useLockTokens(daoId);
  const approveTokens = useApproveTokens(guild?.config?.token);

  useEffect(() => {
    if (
      stakeAmount &&
      token?.allowance?.gte(stakeAmount) &&
      token?.allowance?.gt(0)
    ) {
      setApprovedTokenAllowance(true);
    }
  }, [token, stakeAmount, approvedTokenAllowance]);

  const handleLockTokens = async () => {
    if (!isStakeAmountValid) return;
    await lockTokens(stakeAmount, token?.info?.decimals, token?.info.symbol);
  };

  const handleApproveTokenSpending = async () => {
    if (!isStakeAmountValid) return;
    await approveTokens(guild?.config?.tokenVault);
  };

  return (
    <>
      {!isRepGuild ? (
        stakeAmount && approvedTokenAllowance ? (
          <ActionButton
            data-testid="lock-token-spending"
            disabled={!isStakeAmountValid}
            onClick={handleLockTokens}
          >
            Lock{' '}
            {token?.info?.symbol || (
              <Loading loading text skeletonProps={{ width: 10 }} />
            )}
          </ActionButton>
        ) : (
          <ActionButton
            disabled={!isStakeAmountValid}
            onClick={handleApproveTokenSpending}
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
        <ActionButton onClick={() => navigate('create-proposal')}>
          {t('mintRep')}
        </ActionButton>
      )}
    </>
  );
};

export default StakeTokensButton;
