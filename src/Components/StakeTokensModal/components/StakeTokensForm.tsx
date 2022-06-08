import dxIcon from '../../../assets/images/dxdao-icon.svg';
import { Loading } from '../../Primitives/Loading';
import { formatUnits } from 'ethers/lib/utils';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { FiArrowRight, FiInfo } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import { MAX_UINT } from 'utils';
import {
  GuestContainer,
  DaoBrand,
  DaoIcon,
  DaoTitle,
  InfoItem,
  BalanceWidget,
  InfoRow,
  InfoLabel,
  InfoValue,
  InfoOldValue,
  StakeAmountInput,
  ActionButton,
} from './StakeTokensForm.styled';
import { Button } from 'old-components/Guilds/common/Button';
import useBigNumberToNumber from '../../../hooks/Guilds/conversions/useBigNumberToNumber';
import { BigNumber } from 'ethers';
import useVotingPowerPercent from '../../../hooks/Guilds/guild/useVotingPowerPercent';
import { StakeTokensFormsProps } from '../types';

export const StakeTokensForm = ({
  token,
  userVotingPower,
  createTransaction,
  guild,
  isRepGuild,
}: StakeTokensFormsProps) => {
  const [stakeAmount, setStakeAmount] = useState<BigNumber>(null);

  const isStakeAmountValid = useMemo(
    () =>
      stakeAmount?.gt(0) &&
      token?.info?.decimals &&
      stakeAmount.lte(token?.balance),
    [stakeAmount, token?.balance, token?.info]
  );

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
  const roundedBalance = useBigNumberToNumber(
    token?.balance,
    token?.info?.decimals,
    4
  );

  const currentvotingPowerPercent = useVotingPowerPercent(
    userVotingPower,
    guild?.config?.totalLocked,
    3
  );
  const nextVotingPowerPercent = useVotingPowerPercent(
    stakeAmount?.add(userVotingPower),
    stakeAmount?.add(guild?.config?.totalLocked),
    3
  );

  const history = useHistory();
  const location = useLocation();
  return (
    <GuestContainer data-testid="stake-tokens-modal">
      <DaoBrand>
        <DaoIcon src={dxIcon} alt={'DXdao Logo'} />
        <DaoTitle>
          {guild?.config?.name || (
            <Loading text loading skeletonProps={{ width: 100 }} />
          )}
        </DaoTitle>
      </DaoBrand>
      {!isRepGuild && (
        <InfoItem>
          {guild?.config?.lockTime ? (
            `${moment
              .duration(guild?.config?.lockTime.toNumber(), 'seconds')
              .humanize()} staking period`
          ) : (
            <Loading loading text skeletonProps={{ width: 200 }} />
          )}{' '}
        </InfoItem>
      )}

      {!isRepGuild && (
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
      )}
      {isRepGuild && (
        <InfoRow>
          <InfoLabel>Balance</InfoLabel>
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
      )}
      <InfoRow>
        <InfoLabel>Your voting power</InfoLabel>
        <InfoValue>
          {isStakeAmountValid ? (
            <>
              <InfoOldValue>
                {currentvotingPowerPercent != null ? (
                  `${currentvotingPowerPercent}%`
                ) : (
                  <Loading loading text skeletonProps={{ width: 40 }} />
                )}{' '}
                <FiArrowRight />
              </InfoOldValue>{' '}
              <strong>
                {nextVotingPowerPercent != null ? (
                  `${nextVotingPowerPercent}%`
                ) : (
                  <Loading loading text skeletonProps={{ width: 40 }} />
                )}
              </strong>
            </>
          ) : (
            '-'
          )}
        </InfoValue>
      </InfoRow>
      {!isRepGuild && (
        <InfoRow>
          <InfoLabel>Unlock Date</InfoLabel>
          <InfoValue>
            {isStakeAmountValid ? (
              <>
                <strong>
                  {moment()
                    .add(guild?.config?.lockTime.toNumber(), 'seconds')
                    .format('MMM Do, YYYY - h:mm a')}
                </strong>{' '}
                <FiInfo />
              </>
            ) : (
              '-'
            )}
          </InfoValue>
        </InfoRow>
      )}
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
    </GuestContainer>
  );
};
