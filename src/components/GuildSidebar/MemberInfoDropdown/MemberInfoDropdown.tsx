import { useRef } from 'react';
import { ERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import {
  DropdownMenu,
  DropdownContent,
  DropdownHeader,
} from 'components/primitives/DropdownMenu';
import { Loading } from 'components/primitives/Loading';
import { useDetectBlur } from 'hooks/Guilds/useDetectBlur';
import { isMobile } from 'react-device-detect';
import { FiArrowLeft } from 'react-icons/fi';
import {
  ContentItem,
  LockButton,
  MemberContainer,
} from './MemberInfoDropdown.styled';
import moment, { Moment } from 'moment';
import { BigNumber } from 'ethers';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { useTranslation } from 'react-i18next';

export interface MemberInfoDropdownProps {
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  isRepGuild?: boolean;
  guildToken?: ERC20Info;
  userVotingPower?: BigNumber;
  userVotingPowerPercent?: number;
  unlockedAt?: Moment;
  onWithdraw?: () => void;
  onShowStakeModal?: () => void;
}

export const MemberInfoDropdown: React.FC<MemberInfoDropdownProps> = ({
  children,
  isOpen,
  onClose,
  isRepGuild,
  guildToken,
  userVotingPower,
  userVotingPowerPercent,
  unlockedAt,
  onWithdraw,
  onShowStakeModal,
}) => {
  const { t } = useTranslation();

  const memberMenuRef = useRef(null);
  useDetectBlur(memberMenuRef, onClose);

  const roundedBalance = useBigNumberToNumber(
    userVotingPower,
    guildToken?.decimals,
    3
  );

  const isUnlockable = unlockedAt ? unlockedAt.isBefore(moment.now()) : false;

  function showStakeModal() {
    onClose();
    onShowStakeModal();
  }

  const withdrawTokens = async () => {
    onClose();
    onWithdraw();
  };

  return (
    <DropdownMenu data-testid="member-actions-button" ref={memberMenuRef}>
      {children}

      <DropdownContent fullScreenMobile={true} show={isOpen}>
        {isMobile && (
          <DropdownHeader onClick={onClose}>
            <FiArrowLeft /> <span>{t('membership')}</span>
          </DropdownHeader>
        )}
        <MemberContainer>
          <ContentItem>
            {t('votingPower')}{' '}
            <span>
              {userVotingPowerPercent != null ? (
                `${userVotingPowerPercent}%`
              ) : (
                <Loading loading text skeletonProps={{ width: '40px' }} />
              )}
            </span>
          </ContentItem>
          <ContentItem>
            {!isUnlockable ? t('locked') : t('staked')}{' '}
            <span>
              {userVotingPower && guildToken ? (
                `${roundedBalance} ${guildToken.symbol}`
              ) : (
                <Loading loading text skeletonProps={{ width: '40px' }} />
              )}
            </span>
          </ContentItem>
          {isRepGuild ? (
            <></>
          ) : (
            <ContentItem>
              {isUnlockable ? t('unlocked') : t('unlockedIn')}{' '}
              <span>
                {unlockedAt ? (
                  isUnlockable ? (
                    unlockedAt?.fromNow()
                  ) : (
                    unlockedAt?.toNow(true)
                  )
                ) : (
                  <Loading loading text skeletonProps={{ width: '40px' }} />
                )}
              </span>
            </ContentItem>
          )}

          <LockButton
            data-testid="increase-voting-power-btn"
            onClick={showStakeModal}
          >
            {t('increaseVotingPower')}
          </LockButton>

          {isUnlockable && !isRepGuild && (
            <LockButton onClick={withdrawTokens}>{t('withdraw')}</LockButton>
          )}
        </MemberContainer>
      </DropdownContent>
    </DropdownMenu>
  );
};
