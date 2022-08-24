import { StakeTokensModal } from 'Components/StakeTokensModal';
import StakeTokensForm from 'Components/StakeTokensModal/components/StakeTokensForm/StakeTokensForm';
import { useERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useTransactions } from 'contexts/Guilds';
import { useERC20Allowance } from 'hooks/Guilds/ether-swr/erc20/useERC20Allowance';
import { useERC20Balance } from 'hooks/Guilds/ether-swr/erc20/useERC20Balance';
import useGuildImplementationType from 'hooks/Guilds/guild/useGuildImplementationType';
import { useERC20, useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { useVotingPowerOf } from 'hooks/Guilds/ether-swr/guild/useVotingPowerOf';
import useTotalLocked from 'hooks/Guilds/ether-swr/guild/useTotalLocked';
import { useAccount } from 'wagmi';

const StakeTokensModalWrapper = ({ isOpen, onDismiss }) => {
  const { guildId: guildAddress } = useTypedParams();

  const { data: guildConfig } = useGuildConfig(guildAddress);
  const { data: tokenInfo } = useERC20Info(guildConfig?.token);

  const { address: userAddress } = useAccount();

  const { data: tokenBalance } = useERC20Balance(
    guildConfig?.token,
    userAddress
  );
  const { isRepGuild } = useGuildImplementationType(guildAddress);
  const tokenContract = useERC20(guildConfig?.token);
  const { createTransaction } = useTransactions();
  const guildContract = useERC20Guild(guildAddress);

  const { data: tokenAllowance } = useERC20Allowance(
    guildConfig?.token,
    userAddress,
    guildConfig?.tokenVault
  );
  const { data: userVotingPower } = useVotingPowerOf({
    contractAddress: guildAddress,
    userAddress,
  });
  const { data: totalLocked } = useTotalLocked(guildAddress);

  return (
    <StakeTokensModal token={tokenInfo} isOpen={isOpen} onDismiss={onDismiss}>
      <StakeTokensForm
        token={{
          name: tokenInfo?.name,
          allowance: tokenAllowance,
          balance: tokenBalance,
          info: tokenInfo,
          contract: tokenContract,
        }}
        userVotingPower={userVotingPower}
        createTransaction={createTransaction}
        guild={{ contract: guildContract, config: guildConfig, totalLocked }}
        isRepGuild={isRepGuild}
      />
    </StakeTokensModal>
  );
};

export default StakeTokensModalWrapper;
