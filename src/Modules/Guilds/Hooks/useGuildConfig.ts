import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import useGuildToken from 'Modules/Guilds/Hooks/useGuildToken';
import { useContractReads } from 'wagmi';
import { useVotingPowerForProposalExecution } from 'Modules/Guilds/Hooks/useVotingPowerForProposalExecution';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';

export type GuildConfigProps = {
  name: string;
  token: `0x${string}`;
  permissionRegistry: string;
  proposalTime: BigNumber;
  timeForExecution: BigNumber;
  maxActiveProposals: BigNumber;
  votingPowerForProposalCreation: BigNumber;
  votingPowerForProposalExecution: BigNumber;
  tokenVault: `0x${string}`;
  lockTime: BigNumber;
  votingPowerPercentageForProposalExecution: BigNumber;
  votingPowerPercentageForProposalCreation: BigNumber;
};

export const useGuildConfig = (
  guildAddress: string,
  proposalId?: `0x${string}`
): { data: GuildConfigProps; [rest: string]: any } => {
  const erc20GuildContract = {
    address: guildAddress,
    abi: BaseERC20Guild.abi,
  };

  const { data, ...rest } = useContractReads({
    contracts: [
      {
        ...erc20GuildContract,
        functionName: 'getPermissionRegistry', // Get the address of the permission registry contract
      },
      {
        ...erc20GuildContract,
        functionName: 'getName', // Get the name of the ERC20Guild
      },
      {
        ...erc20GuildContract,
        functionName: 'getProposalTime', // Get the proposalTime (seconds)
      },
      {
        ...erc20GuildContract,
        functionName: 'getTimeForExecution', // Get the timeForExecution (seconds)
      },
      {
        ...erc20GuildContract,
        functionName: 'getMaxActiveProposals', // Get the maxActiveProposals
      },
      {
        ...erc20GuildContract,
        functionName: 'getVotingPowerForProposalCreation',
      },
      {
        ...erc20GuildContract,
        functionName: 'getTokenVault', // Get the address of the token vault
      },
      {
        ...erc20GuildContract,
        functionName: 'getLockTime', // Get the lockTime (seconds)
      },
      {
        ...erc20GuildContract,
        functionName: 'votingPowerPercentageForProposalExecution',
      },
      {
        ...erc20GuildContract,
        functionName: 'votingPowerPercentageForProposalCreation',
      },
    ],
  });
  const { data: token } = useGuildToken(guildAddress);
  const { data: votingPowerForProposalExecution } =
    useVotingPowerForProposalExecution({
      contractAddress: guildAddress,
      proposalId,
    });
  const transformedData = useMemo(() => {
    if (!data) return undefined;

    const [
      permissionRegistry,
      name,
      proposalTime,
      timeForExecution,
      maxActiveProposals,
      votingPowerForProposalCreation,
      tokenVault,
      lockTime,
      votingPowerPercentageForProposalExecution,
      votingPowerPercentageForProposalCreation,
    ] = data;

    return {
      permissionRegistry: permissionRegistry?.toString(),
      name: name?.toString(),
      proposalTime: proposalTime ? BigNumber.from(proposalTime) : undefined,
      timeForExecution: timeForExecution
        ? BigNumber.from(timeForExecution)
        : undefined,
      maxActiveProposals: maxActiveProposals
        ? BigNumber.from(maxActiveProposals)
        : undefined,
      votingPowerForProposalCreation: votingPowerForProposalCreation
        ? BigNumber.from(votingPowerForProposalCreation)
        : undefined,
      tokenVault: tokenVault,
      lockTime: lockTime ? BigNumber?.from(lockTime) : undefined,
      votingPowerPercentageForProposalExecution:
        votingPowerPercentageForProposalExecution
          ? BigNumber?.from(votingPowerPercentageForProposalExecution)
          : undefined,
      votingPowerPercentageForProposalCreation:
        votingPowerPercentageForProposalCreation
          ? BigNumber?.from(votingPowerPercentageForProposalCreation)
          : undefined,
    };
  }, [data]);

  return {
    data: transformedData
      ? { ...transformedData, votingPowerForProposalExecution, token }
      : undefined,
    ...rest,
  };
};
