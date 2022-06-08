import {
  BalanceWidget,
  StakeAmountInput,
  InfoRow,
  InfoLabel,
  InfoValue,
} from './StakeTokensForm.styled';
import { Button } from 'old-components/Guilds/common/Button';
import { Loading } from '../../Primitives/Loading';
import { BalanceWidgetWrapperProps } from '../types';

export const BalanceWidgetWrapper = ({
  token,
  stakeAmount,
  setStakeAmount,
  roundedBalance,
}: BalanceWidgetWrapperProps) => {
  return (
    <BalanceWidget>
      <InfoRow>
        <InfoLabel>Balance:</InfoLabel>
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
          value={stakeAmount}
          onChange={setStakeAmount}
          decimals={token?.info?.decimals}
          data-testid="stake-amount-input"
        />
        <Button
          data-testid="stake-amount-max-button"
          onClick={() => setStakeAmount(token?.balance)}
        >
          Max
        </Button>
      </InfoRow>
    </BalanceWidget>
  );
};
