import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
import useGuildToken from './useGuildToken';
import { useContractReads } from 'wagmi';

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

export const useGuildConfig = (guildAddress: string) => {
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
        functionName: 'getVotingPowerForProposalExecution',
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
  const transformedData = useMemo(() => {
    if (!data) return undefined;

    const [
      permissionRegistry,
      name,
      proposalTime,
      timeForExecution,
      maxActiveProposals,
      votingPowerForProposalCreation,
      votingPowerForProposalExecution,
      tokenVault,
      lockTime,
    ] = data;
    return {
      permissionRegistry: permissionRegistry.toString(),
      name: name.toString(),
      proposalTime: BigNumber.from(proposalTime),
      timeForExecution: BigNumber.from(timeForExecution),
      maxActiveProposals: BigNumber.from(maxActiveProposals),
      votingPowerForProposalCreation: BigNumber.from(
        votingPowerForProposalCreation
      ),
      votingPowerForProposalExecution: BigNumber.from(
        votingPowerForProposalExecution
      ),
      tokenVault: tokenVault.toString(),
      lockTime: BigNumber.from(lockTime),
    };
  }, [data]);

  return {
    data: transformedData ? { ...transformedData, token } : undefined,
    ...rest,
  };
};
