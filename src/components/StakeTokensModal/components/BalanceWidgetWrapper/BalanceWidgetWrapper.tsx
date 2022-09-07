import {
  BalanceWidget,
  StakeAmountInput,
  InfoRow,
  InfoLabel,
  InfoValue,
} from '../StakeTokensForm/StakeTokensForm.styled';
import { Button } from 'components/primitives/Button';
import { Loading } from 'components/primitives/Loading';
import { BalanceWidgetWrapperProps } from '../../types';
import { useTranslation } from 'react-i18next';
import { BigNumber } from 'ethers';
const BalanceWidgetWrapper = ({
  token,
  stakeAmount,
  setStakeAmount,
  roundedBalance,
}: BalanceWidgetWrapperProps) => {
  const { t } = useTranslation();
  return (
    <BalanceWidget>
      <InfoRow>
        <InfoLabel>{t('balance')}:</InfoLabel>
        <InfoValue>
          {token?.balance && token?.info ? (
            roundedBalance
          ) : (
            <Loading loading text skeletonProps={{ width: 30 }} />
          )}{' '}
          {token?.info?.symbol || (
            <Loading loading text skeletonProps={{ width: 10 }} />
          )}
        </InfoValue>
      </InfoRow>
      <InfoRow>
        <StakeAmountInput
          value={stakeAmount || BigNumber.from(0)}
          onChange={setStakeAmount}
          decimals={token?.info?.decimals}
          data-testid="stake-amount-input"
        />
        <Button
          data-testid="stake-amount-max-button"
          onClick={() => setStakeAmount(token?.balance)}
        >
          {t('max')}
        </Button>
      </InfoRow>
    </BalanceWidget>
  );
};

export default BalanceWidgetWrapper;
