import {
  InfoRow,
  InfoLabel,
  InfoValue,
  InfoOldValue,
  InfoItem,
} from '../StakeTokensForm/StakeTokensForm.styled';
import { FiArrowRight } from 'react-icons/fi';
import { Loading } from 'components/primitives/Loading';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import { FiInfo } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  BalanceInfoLineProps,
  LockTimeInfoLineProps,
  UnlockDateInfoLineProps,
  VotingPowerInfoLineProps,
} from '../../types';

export const LockTimeInfoLine = ({ guild }: LockTimeInfoLineProps) => {
  return (
    <InfoItem>
      {guild?.config?.lockTime ? (
        `${moment
          .duration(guild?.config?.lockTime.toNumber(), 'seconds')
          .humanize()} staking period`
      ) : (
        <Loading loading text skeletonProps={{ width: 200 }} />
      )}
    </InfoItem>
  );
};

export const BalanceInfoLine = ({
  token,
  roundedBalance,
}: BalanceInfoLineProps) => {
  const { t } = useTranslation();
  return (
    <InfoRow>
      <InfoLabel>{t('balance')}</InfoLabel>
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
  );
};

export const VotingPowerInfoLine = ({
  isStakeAmountValid,
  userVotingPower,
  guild,
  stakeAmount,
}: VotingPowerInfoLineProps) => {
  const { t } = useTranslation();
  const currentvotingPowerPercent = useVotingPowerPercent(
    userVotingPower,
    guild?.totalLocked,
    3
  );
  const nextVotingPowerPercent = useVotingPowerPercent(
    stakeAmount?.add(userVotingPower),
    stakeAmount?.add(guild?.totalLocked),
    3
  );

  return (
    <InfoRow>
      <InfoLabel>{t('yourVotingPower')}</InfoLabel>
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
  );
};

export const UnlockDateInfoLine = ({
  isRepGuild,
  isStakeAmountValid,
  guild,
}: UnlockDateInfoLineProps) => {
  const { t } = useTranslation();
  return (
    <>
      {!isRepGuild && (
        <InfoRow>
          <InfoLabel>{t('unlockDate')}</InfoLabel>
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
    </>
  );
};
