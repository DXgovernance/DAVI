import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import { useWeb3React } from '@web3-react/core';
import useGuildMemberTotal from 'hooks/Guilds/ether-swr/guild/useGuildMemberTotal';
import { useVotingPowerOf } from 'hooks/Guilds/ether-swr/guild/useVotingPowerOf';
import { GuildSidebar } from 'Components/GuildSidebar';
import { MemberActions } from 'Components/GuildSidebar/MemberActions';
import { GuestActions } from 'Components/GuildSidebar/GuestActions';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { MAINNET_ID } from 'utils';
import { useERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import { useVoterLockTimestamp } from 'hooks/Guilds/ether-swr/guild/useVoterLockTimestamp';
import useGuildImplementationType from 'hooks/Guilds/guild/useGuildImplementationType';
import { useTransactions } from 'contexts/Guilds';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { formatUnits } from 'ethers/lib/utils';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import StakeTokensModal from 'old-components/Guilds/StakeTokensModal';
import { useState } from 'react';
import WalletModal from 'old-components/Guilds/Web3Modals/WalletModal';

const GuildSidebarWrapper = () => {
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const { guildId: guildAddress } = useTypedParams();
  const { data: guildConfig } = useGuildConfig(guildAddress);
  const { isRepGuild } = useGuildImplementationType(guildAddress);
  const { data: guildToken } = useERC20Info(guildConfig?.token);
  const { data: numberOfMembers } = useGuildMemberTotal(guildAddress);

  const { account: userAddress } = useWeb3React();
  const userEnsAvatar = useENSAvatar(userAddress, MAINNET_ID);
  const { data: unlockedAt } = useVoterLockTimestamp(guildAddress, userAddress);
  const { data: userVotingPower } = useVotingPowerOf({
    contractAddress: guildAddress,
    userAddress,
  });
  const votingPowerPercent = useVotingPowerPercent(
    userVotingPower,
    guildConfig?.totalLocked
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
              userEnsAvatar={userEnsAvatar}
              userVotingPower={userVotingPower}
              userVotingPowerPercent={votingPowerPercent}
              unlockedAt={unlockedAt}
              onWithdraw={withdrawTokens}
              onShowStakeModal={() => setIsStakeModalOpen(true)}
            />
          ) : (
            <GuestActions
              userWalletAddress={userAddress}
              onShowStakeModal={() => setIsStakeModalOpen(true)}
              onShowWalletModal={() => setIsWalletModalOpen(true)}
            />
          )
        }
      />

      <StakeTokensModal
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
