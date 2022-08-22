import { ERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import { shortenAddress } from 'utils';
import Avatar from 'Components/Avatar';
import { Loading } from '../../Primitives/Loading';
import { Moment } from 'moment';
import { useState } from 'react';
import {
  IconHolder,
  UserActionButton,
  VotingPower,
} from './MemberActions.styled';
import { BigNumber } from 'ethers';
import { ENSAvatar } from 'Components/Types';
import { MemberInfoDropdown } from '../MemberInfoDropdown';

export interface MemberActionsProps {
  guildToken?: ERC20Info;
  isRepGuild?: boolean;
  userWalletAddress?: string;
  userVotingPower?: BigNumber;
  userEnsAvatar?: ENSAvatar;
  userVotingPowerPercent?: number;
  unlockedAt?: Moment;
  onWithdraw?: () => void;
  onShowStakeModal?: () => void;
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

  return (
    <MemberInfoDropdown
      isOpen={isInfoDropdownOpen}
      onClose={() => setIsInfoDropdownOpen(false)}
      guildToken={guildToken}
      isRepGuild={isRepGuild}
      userVotingPower={userVotingPower}
      userVotingPowerPercent={userVotingPowerPercent}
      unlockedAt={unlockedAt}
      onWithdraw={onWithdraw}
      onShowStakeModal={onShowStakeModal}
    >
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
            {userWalletAddress ? (
              userEnsAvatar?.ensName || shortenAddress(userWalletAddress)
            ) : (
              <Loading loading text />
            )}
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
    </MemberInfoDropdown>
  );
};
