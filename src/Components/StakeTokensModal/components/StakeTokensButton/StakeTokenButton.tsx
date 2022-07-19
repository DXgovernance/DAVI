import { useHistory, useLocation } from 'react-router-dom';
import { MAX_UINT, navigateUrl } from 'utils';
import { formatUnits } from 'ethers/lib/utils';
import { ActionButton } from '../StakeTokensForm/StakeTokensForm.styled';
import { Loading } from 'Components/Primitives/Loading';
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
  const history = useHistory();
  const location = useLocation();
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
        <ActionButton
          onClick={() => history.push(navigateUrl(location, 'proposalType'))}
        >
          {t('mintRep')}
        </ActionButton>
      )}
    </>
  );
};

export default StakeTokensButton;
