import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import useGuildMemberTotal from 'hooks/Guilds/ether-swr/guild/useGuildMemberTotal';
import { useVotingPowerOf } from 'hooks/Guilds/ether-swr/guild/useVotingPowerOf';
import { GuildSidebar } from 'components/GuildSidebar';
import { MemberActions } from 'components/GuildSidebar/MemberActions';
import { GuestActions } from 'components/GuildSidebar/GuestActions';
import { useERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import { useVoterLockTimestamp } from 'hooks/Guilds/ether-swr/guild/useVoterLockTimestamp';
import useGuildImplementationType from 'hooks/Guilds/guild/useGuildImplementationType';
import { useTransactions } from 'contexts/Guilds';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { formatUnits } from 'ethers/lib/utils';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import { useState } from 'react';
import { WalletModal } from 'components/Web3Modals';
import useTotalLocked from 'hooks/Guilds/ether-swr/guild/useTotalLocked';
import StakeTokensModalWrapper from './StakeTokensModalWrapper';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';
import { isReadOnly } from 'provider/wallets';

const GuildSidebarWrapper = () => {
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const { guildId: guildAddress } = useTypedParams();
  const { data: guildConfig } = useGuildConfig(guildAddress);
  const { isRepGuild } = useGuildImplementationType(guildAddress);
  const { data: guildToken } = useERC20Info(guildConfig?.token);
  const { data: numberOfMembers } = useGuildMemberTotal(guildAddress);
  const { address: userAddress, connector } = useAccount();
  const { data: ensName } = useEnsName({ address: userAddress });
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: userAddress });
  const { data: unlockedAt } = useVoterLockTimestamp(guildAddress, userAddress);
  const { data: userVotingPower } = useVotingPowerOf({
    contractAddress: guildAddress,
    userAddress,
  });
  const { data: totalLocked } = useTotalLocked(guildAddress);
  const votingPowerPercent = useVotingPowerPercent(
    userVotingPower,
    totalLocked
  );

  const { createTransaction } = useTransactions();
  const guildContract = useERC20Guild(guildAddress);
  const withdrawTokens = async () => {
    createTransaction(
      `Unlock and withdraw ${formatUnits(
        userVotingPower,
        guildToken?.decimals
      )} ${guildToken?.symbol} tokens`,
      async () => guildContract.withdrawTokens(userVotingPower)
    );
  };

  return (
    <>
      <GuildSidebar
        guildName={guildConfig?.name}
        numberOfMembers={numberOfMembers}
        actions={
          userVotingPower && !userVotingPower?.isZero() ? (
            <MemberActions
              guildToken={guildToken}
              isRepGuild={isRepGuild}
              userWalletAddress={userAddress}
              userEnsAvatar={{ ensName, imageUrl: ensAvatar }}
              userVotingPower={userVotingPower}
              userVotingPowerPercent={votingPowerPercent}
              unlockedAt={unlockedAt}
              onWithdraw={withdrawTokens}
              onShowStakeModal={() => setIsStakeModalOpen(true)}
            />
          ) : (
            <GuestActions
              userWalletAddress={isReadOnly(connector) ? null : userAddress}
              onShowStakeModal={() => setIsStakeModalOpen(true)}
              onShowWalletModal={() => setIsWalletModalOpen(true)}
            />
          )
        }
      />

      <StakeTokensModalWrapper
        isOpen={isStakeModalOpen}
        onDismiss={() => setIsStakeModalOpen(false)}
      />

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};

export default GuildSidebarWrapper;
