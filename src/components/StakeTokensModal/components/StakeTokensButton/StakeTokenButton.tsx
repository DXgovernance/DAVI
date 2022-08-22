import { useNavigate } from 'react-router-dom';
import { MAX_UINT } from 'utils';
import { formatUnits } from 'ethers/lib/utils';
import { ActionButton } from '../StakeTokensForm/StakeTokensForm.styled';
import { Loading } from 'components/Primitives/Loading';
import { StakeTokenButtonProps } from '../../types';
import { useTranslation } from 'react-i18next';
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
