import { StakeTokensModal } from 'components/StakeTokensModal';
import StakeTokensForm from 'components/StakeTokensModal/components/StakeTokensForm/StakeTokensForm';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useTransactions } from 'contexts/Guilds';
import { useERC20Allowance } from 'hooks/Guilds/erc20/useERC20Allowance';
import { useERC20Balance } from 'hooks/Guilds/erc20/useERC20Balance';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { useERC20, useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { useVotingPowerOf } from 'Modules/Guilds/Hooks/useVotingPowerOf';
import { useAccount } from 'wagmi';
import { useHookStoreProvider } from 'stores';

const StakeTokensModalWrapper = ({ isOpen, onDismiss }) => {
  const { guildId: guildAddress } = useTypedParams();

  const {
    hooks: {
      fetchers: { useTotalLocked },
    },
  } = useHookStoreProvider();

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
