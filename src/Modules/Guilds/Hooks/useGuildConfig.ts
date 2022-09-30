import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
import useGuildToken from 'Modules/Guilds/Hooks/useGuildToken';
import { useContractReads } from 'wagmi';
import { useVotingPowerForProposalExecution } from 'Modules/Guilds/Hooks/useVotingPowerForProposalExecution';

export type GuildConfigProps = {
  name: string;
  token: string;
  permissionRegistry: string;
  proposalTime: BigNumber;
  timeForExecution: BigNumber;
  maxActiveProposals: BigNumber;
  votingPowerForProposalCreation: BigNumber;
  votingPowerForProposalExecution: BigNumber;
  tokenVault: string;
  lockTime: BigNumber;
};

export const useGuildConfig = (guildAddress: string, proposalId?: string) => {
  const erc20GuildContract = {
    addressOrName: guildAddress,
    contractInterface: ERC20GuildContract.abi,
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
      tokenVault: tokenVault?.toString(),
      lockTime: lockTime ? BigNumber?.from(lockTime) : undefined,
    };
  }, [data]);

  return {
    data: transformedData
      ? { ...transformedData, votingPowerForProposalExecution, token }
      : undefined,
    ...rest,
  };
};
