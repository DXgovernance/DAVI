import dxIcon from 'assets/images/dxdao-icon.svg';
import { Loading } from 'components/Primitives/Loading';
import { useMemo, useState } from 'react';

import {
  GuestContainer,
  DaoBrand,
  DaoIcon,
  DaoTitle,
} from './StakeTokensForm.styled';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { BigNumber } from 'ethers';
import { StakeTokensFormsProps } from '../../types';

import {
  VotingPowerInfoLine,
  UnlockDateInfoLine,
  BalanceInfoLine,
  LockTimeInfoLine,
} from '../StakeTokensInfoLine/StakeTokensInfoLine';
import { BalanceWidgetWrapper } from '../BalanceWidgetWrapper';
import { StakeTokensButton } from '../StakeTokensButton';

const StakeTokensForm = ({
  token,
  userVotingPower,
  createTransaction,
  guild,
  isRepGuild,
}: StakeTokensFormsProps) => {
  const [stakeAmount, setStakeAmount] = useState<BigNumber>(BigNumber.from(0));
  const isStakeAmountValid = useMemo(
    () =>
      stakeAmount?.gt(0) &&
      token?.info?.decimals &&
      stakeAmount.lte(token?.balance),
    [stakeAmount, token?.balance, token?.info]
  );

  const roundedBalance = useBigNumberToNumber(
    token?.balance,
    token?.info?.decimals,
    4
  );

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
        <>
          <LockTimeInfoLine guild={guild} />
          <BalanceWidgetWrapper
            token={token}
            stakeAmount={stakeAmount}
            setStakeAmount={setStakeAmount}
            roundedBalance={roundedBalance}
          />
          <BalanceInfoLine token={token} roundedBalance={roundedBalance} />
        </>
      )}

      <VotingPowerInfoLine
        isStakeAmountValid={isStakeAmountValid}
        guild={guild}
        userVotingPower={userVotingPower}
        stakeAmount={stakeAmount}
      />
      <UnlockDateInfoLine
        isRepGuild={isRepGuild}
        isStakeAmountValid={isStakeAmountValid}
        guild={guild}
      />
      <StakeTokensButton
        isRepGuild={isRepGuild}
        isStakeAmountValid={isStakeAmountValid}
        createTransaction={createTransaction}
        token={token}
        stakeAmount={stakeAmount}
        guild={guild}
      />
    </GuestContainer>
  );
};

export default StakeTokensForm;
