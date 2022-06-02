import { StakeTokens } from 'Components/StakeTokensModal/components/StakeTokens';
import { useTransactions } from '../../../contexts/Guilds';
import { useERC20Allowance } from '../../../hooks/Guilds/ether-swr/erc20/useERC20Allowance';
import { useERC20Balance } from '../../../hooks/Guilds/ether-swr/erc20/useERC20Balance';
import { useERC20Info } from '../../../hooks/Guilds/ether-swr/erc20/useERC20Info';
import { useGuildConfig } from '../../../hooks/Guilds/ether-swr/guild/useGuildConfig';
import { useVotingPowerOf } from '../../../hooks/Guilds/ether-swr/guild/useVotingPowerOf';
import useGuildImplementationType from '../../../hooks/Guilds/guild/useGuildImplementationType';
import { useERC20, useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { useWeb3React } from '@web3-react/core';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import useVotingPowerPercent from '../../../hooks/Guilds/guild/useVotingPowerPercent';
import { BigNumber } from 'ethers';
import { useState } from 'react';

const StakeTokensWrapper = () => {
  const [stakeAmount, setStakeAmount] = useState<BigNumber>(null);
  const { account: userAddress } = useWeb3React();
  const { guildId: guildAddress } = useTypedParams();
  const { data: guildConfig } = useGuildConfig(guildAddress);
  const { data: tokenInfo } = useERC20Info(guildConfig?.token);

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

  const votingPowerPercent = useVotingPowerPercent(
    userVotingPower,
    guildConfig?.totalLocked,
    3
  );
  const nextVotingPowerPercent = useVotingPowerPercent(
    stakeAmount?.add(userVotingPower),
    stakeAmount?.add(guildConfig?.totalLocked),
    3
  );

  return (
    <StakeTokens
      token={{
        allowance: tokenAllowance,
        balance: tokenBalance,
        info: tokenInfo,
        contract: tokenContract,
      }}
      createTransaction={createTransaction}
      guild={{ contract: guildContract, config: guildConfig }}
      isRepGuild={isRepGuild}
      votingPowerPercent={{
        current: votingPowerPercent,
        next: nextVotingPowerPercent,
      }}
      stakeAmount={stakeAmount}
      setStakeAmount={setStakeAmount}
    />
  );
};

export default StakeTokensWrapper;

