import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { ERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import { shortenAddress } from 'utils';
import Avatar from 'old-components/Guilds/Avatar';
import {
  DropdownMenu,
  DropdownContent,
  DropdownHeader,
} from 'old-components/Guilds/common/DropdownMenu';
import { Loading } from '../../Primitives/Loading';
import { useDetectBlur } from 'hooks/Guilds/useDetectBlur';
import moment, { Moment } from 'moment';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FiArrowLeft } from 'react-icons/fi';
import {
  ContentItem,
  IconHolder,
  LockButton,
  MemberContainer,
  UserActionButton,
  VotingPower,
} from './MemberActions.styled';
import { BigNumber } from 'ethers';
import { ENSAvatar } from 'Components/Types';

interface MemberActionsProps {
  guildToken?: ERC20Info;
  isRepGuild: boolean;
  userWalletAddress: string;
  userEnsAvatar?: ENSAvatar;
  userVotingPower?: BigNumber;
  userVotingPowerPercent?: number;
  unlockedAt: Moment;
  onWithdraw: () => void;
  onShowStakeModal: () => void;
}

export const MemberActions: React.FC<MemberActionsProps> = ({
  isRepGuild,
  guildToken,
  userWalletAddress,
  userEnsAvatar,
  userVotingPower,
  userVotingPowerPercent,
  unlockedAt,
  onWithdraw,
  onShowStakeModal,
}) => {
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);

  const roundedBalance = useBigNumberToNumber(
    userVotingPower,
    guildToken?.decimals,
    3
  );

  const isUnlockable = unlockedAt ? unlockedAt.isBefore(moment.now()) : false;

  function showStakeModal() {
    setIsInfoDropdownOpen(false);
    onShowStakeModal();
  }

  const withdrawTokens = async () => {
    setIsInfoDropdownOpen(false);
    onWithdraw();
  };

  const memberMenuRef = useRef(null);
  useDetectBlur(memberMenuRef, () => setIsInfoDropdownOpen(false));

  return (
    <>
      <DropdownMenu data-testid="member-actions-button" ref={memberMenuRef}>
        <UserActionButton
          iconLeft
          onClick={() => setIsInfoDropdownOpen(!isInfoDropdownOpen)}
        >
          <div>
            <IconHolder>
              <Avatar
                src={userEnsAvatar?.imageUrl}
                defaultSeed={userWalletAddress}
                size={18}
              />
            </IconHolder>
            <span>
              {userEnsAvatar?.ensName || shortenAddress(userWalletAddress)}
            </span>
          </div>
          <VotingPower>
            {userVotingPowerPercent != null ? (
              `${userVotingPowerPercent}%`
            ) : (
              <Loading loading text skeletonProps={{ width: '40px' }} />
            )}
          </VotingPower>
        </UserActionButton>
        <DropdownContent fullScreenMobile={true} show={isInfoDropdownOpen}>
          {isMobile && (
            <DropdownHeader onClick={() => setIsInfoDropdownOpen(false)}>
              <FiArrowLeft /> <span>Membership</span>
            </DropdownHeader>
          )}
          <MemberContainer>
            <ContentItem>
              Voting Power{' '}
              <span>
                {userVotingPowerPercent != null ? (
                  `${userVotingPowerPercent}%`
                ) : (
                  <Loading loading text skeletonProps={{ width: '40px' }} />
                )}
              </span>
            </ContentItem>
            <ContentItem>
              {!isUnlockable ? 'Locked' : 'Staked'}{' '}
              <span>
                {userVotingPower && guildToken ? (
                  `${roundedBalance} ${guildToken.symbol}`
                ) : (
                  <Loading loading text skeletonProps={{ width: '40px' }} />
                )}
              </span>
            </ContentItem>

            <ContentItem>
              {isUnlockable ? 'Unlocked' : 'Unlocked in'}{' '}
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

            <LockButton onClick={showStakeModal}>
              Increase Voting Power
            </LockButton>

            {isUnlockable && !isRepGuild && (
              <LockButton onClick={withdrawTokens}>Withdraw</LockButton>
            )}
          </MemberContainer>
        </DropdownContent>
      </DropdownMenu>
    </>
  );
};
